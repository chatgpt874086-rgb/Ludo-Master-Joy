import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("ludojoy.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT UNIQUE,
    username TEXT,
    mobile TEXT UNIQUE,
    password TEXT,
    user_id TEXT UNIQUE,
    wallet_balance REAL DEFAULT 0,
    referral_code TEXT,
    referred_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id TEXT,
    amount REAL,
    room_code TEXT,
    status TEXT DEFAULT 'open', -- open, joined, completed
    opponent_id TEXT,
    winner_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    amount REAL,
    type TEXT, -- deposit, withdraw, bet_create, bet_win, bet_lose, referral_commission
    status TEXT DEFAULT 'pending', -- pending, success, failed
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  -- Default settings
  INSERT OR IGNORE INTO settings (key, value) VALUES ('razorpay_key_id', '');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('razorpay_secret', '');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('rules', '1. Minimum bet is ₹100. 2. 2% commission on referral. 3. Play fair.');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('deposit_options', '100,200,300,400,500,1000,2000,5000');
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/signup", (req, res) => {
    const { username, mobile, password, referralCode } = req.body;
    const userId = Math.floor(10000 + Math.random() * 90000).toString();
    const uid = Math.random().toString(36).substring(7);
    
    try {
      const stmt = db.prepare("INSERT INTO users (uid, username, mobile, password, user_id, referred_by) VALUES (?, ?, ?, ?, ?, ?)");
      stmt.run(uid, username, mobile, password, userId, referralCode || null);
      res.json({ success: true, user: { uid, username, mobile, user_id: userId } });
    } catch (e) {
      res.status(400).json({ error: "Mobile number already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { mobile, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE mobile = ? AND password = ?").get(mobile, password);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // User Routes
  app.get("/api/user/:uid", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE uid = ?").get(req.params.uid);
    res.json(user);
  });

  // Bet Routes
  app.post("/api/bets/create", (req, res) => {
    const { uid, amount, roomCode } = req.body;
    const user = db.prepare("SELECT wallet_balance FROM users WHERE uid = ?").get(uid);
    
    if (user.wallet_balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const stmt = db.prepare("INSERT INTO bets (creator_id, amount, room_code) VALUES (?, ?, ?)");
    stmt.run(uid, amount, roomCode);
    
    // Deduct balance
    db.prepare("UPDATE users SET wallet_balance = wallet_balance - ? WHERE uid = ?").run(amount, uid);
    
    res.json({ success: true });
  });

  app.get("/api/bets", (req, res) => {
    const bets = db.prepare(`
      SELECT b.*, u.username as creator_name 
      FROM bets b 
      JOIN users u ON b.creator_id = u.uid 
      WHERE b.status = 'open'
      ORDER BY b.created_at DESC
    `).all();
    res.json(bets);
  });

  // Admin Routes
  app.get("/api/admin/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  });

  app.post("/api/admin/settings", (req, res) => {
    const { key, value } = req.body;
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, value);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
