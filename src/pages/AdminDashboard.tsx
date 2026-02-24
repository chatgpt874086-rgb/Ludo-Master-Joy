import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Gamepad2, 
  Wallet, 
  Settings, 
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Save
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [settings, setSettings] = useState({
    razorpay_key_id: '',
    razorpay_secret: '',
    rules: '',
    deposit_options: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await fetch('/api/admin/settings');
    const data = await res.json();
    setSettings(data);
  };

  const handleSaveSetting = async (key: string, value: string) => {
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    alert("Setting saved!");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black">Admin Panel</h1>
            <p className="text-slate-500 text-sm">Ludo Joy Management</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4">
        {[
          { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
          { id: 'users', icon: Users, label: 'Users' },
          { id: 'games', icon: Gamepad2, label: 'Games' },
          { id: 'settings', icon: Settings, label: 'Settings' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`glass-card p-4 flex flex-col items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            <tab.icon size={24} />
            <span className="text-xs font-bold uppercase">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="glass-card p-6 space-y-2">
            <p className="text-slate-500 text-xs font-bold uppercase">Total Users</p>
            <p className="text-3xl font-black">1,248</p>
            <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
              <TrendingUp size={12} /> +12%
            </div>
          </div>
          <div className="glass-card p-6 space-y-2">
            <p className="text-slate-500 text-xs font-bold uppercase">Active Bets</p>
            <p className="text-3xl font-black">42</p>
            <div className="flex items-center gap-1 text-blue-400 text-xs font-bold">
              Live Now
            </div>
          </div>
          <div className="glass-card p-6 space-y-2">
            <p className="text-slate-500 text-xs font-bold uppercase">Revenue</p>
            <p className="text-3xl font-black">₹45,200</p>
            <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
              <TrendingUp size={12} /> +8%
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Wallet size={20} className="text-blue-400" />
              Razorpay Configuration
            </h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Razorpay Key ID</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="ios-input flex-1"
                    value={settings.razorpay_key_id}
                    onChange={(e) => setSettings({...settings, razorpay_key_id: e.target.value})}
                  />
                  <button 
                    onClick={() => handleSaveSetting('razorpay_key_id', settings.razorpay_key_id)}
                    className="p-4 bg-blue-600 rounded-2xl text-white"
                  >
                    <Save size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Razorpay Secret Key</label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    className="ios-input flex-1"
                    value={settings.razorpay_secret}
                    onChange={(e) => setSettings({...settings, razorpay_secret: e.target.value})}
                  />
                  <button 
                    onClick={() => handleSaveSetting('razorpay_secret', settings.razorpay_secret)}
                    className="p-4 bg-blue-600 rounded-2xl text-white"
                  >
                    <Save size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <AlertCircle size={20} className="text-yellow-400" />
              Game Rules & Content
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Rules (Markdown supported)</label>
              <textarea 
                className="ios-input w-full h-32 resize-none"
                value={settings.rules}
                onChange={(e) => setSettings({...settings, rules: e.target.value})}
              />
              <button 
                onClick={() => handleSaveSetting('rules', settings.rules)}
                className="w-full bg-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <Save size={20} /> Save Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
