import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Copy, Play, X, Clock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Bet {
  id: number;
  creator_id: string;
  creator_name: string;
  amount: number;
  room_code: string;
  created_at: string;
}

export default function GamePage() {
  const { type } = useParams();
  const { user, refreshUser } = useAuth();
  const [bets, setBets] = useState<Bet[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBets();
    const interval = setInterval(fetchBets, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBets = async () => {
    try {
      const res = await fetch('/api/bets');
      const data = await res.json();
      setBets(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateBet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !roomCode) return;
    
    if (user!.wallet_balance < parseFloat(amount)) {
      alert("Insufficient balance!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/bets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user!.uid,
          amount: parseFloat(amount),
          roomCode
        })
      });
      
      if (res.ok) {
        setShowCreateModal(false);
        setAmount('');
        setRoomCode('');
        fetchBets();
        refreshUser();
      } else {
        const err = await res.json();
        alert(err.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredBets = bets.filter(b => 
    b.creator_name.toLowerCase().includes(search.toLowerCase()) ||
    b.amount.toString().includes(search)
  );

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold capitalize">{type} Ludo</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-2xl flex items-center gap-2 font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/30"
        >
          <Plus size={20} />
          Create Bet
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Search bets by user or amount..."
          className="ios-input w-full pl-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredBets.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No active bets found. Create one!
          </div>
        ) : (
          filteredBets.map((bet) => (
            <motion.div 
              key={bet.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-blue-400" />
                  <span className="font-bold text-lg">{bet.creator_name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(bet.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="font-bold text-white">₹{bet.amount}</span>
                </div>
              </div>
              
              <button 
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-500/20"
                onClick={() => {
                  if (user!.wallet_balance < bet.amount) {
                    alert("Insufficient balance to play this bet!");
                  } else {
                    alert(`Room Code: ${bet.room_code}\nCopy it and join the game!`);
                  }
                }}
              >
                <Play size={18} fill="currentColor" />
                Play
              </button>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card w-full max-w-sm p-8 space-y-6 relative z-10"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Create New Bet</h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateBet} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Bet Amount (₹)</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    className="ios-input w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Room Code</label>
                  <input 
                    type="text" 
                    placeholder="Enter Ludo room code"
                    className="ios-input w-full"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-green-500/30 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Submit Bet'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
