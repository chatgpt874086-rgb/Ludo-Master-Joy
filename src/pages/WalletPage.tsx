import { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, ArrowDownCircle, ArrowUpCircle, Info, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function WalletPage() {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  const depositOptions = [100, 200, 300, 400, 500, 1000, 2000, 5000];

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <div className="inline-flex p-4 rounded-full bg-blue-500/20 text-blue-400 mb-2">
          <Wallet size={40} />
        </div>
        <h1 className="text-3xl font-bold">My Wallet</h1>
        <p className="text-slate-400">Available Balance</p>
        <p className="text-5xl font-black text-white">₹{user?.wallet_balance || 0}</p>
      </header>

      <div className="flex p-1 bg-white/5 rounded-2xl">
        <button 
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'deposit' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400'}`}
        >
          Deposit
        </button>
        <button 
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'withdraw' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400'}`}
        >
          Withdraw
        </button>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-400">
            {activeTab === 'deposit' ? 'Enter Deposit Amount' : 'Enter Withdrawal Amount'}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-500">₹</span>
            <input 
              type="number" 
              className="ios-input w-full pl-10 text-2xl font-bold"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        {activeTab === 'deposit' && (
          <div className="grid grid-cols-4 gap-2">
            {depositOptions.map((opt) => (
              <button 
                key={opt}
                onClick={() => setAmount(opt.toString())}
                className="py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors"
              >
                +{opt}
              </button>
            ))}
          </div>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-blue-500/30">
          {activeTab === 'deposit' ? 'Add Cash' : 'Withdraw Now'}
        </button>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-bold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 flex flex-col items-center gap-2 text-center">
            <div className="p-3 rounded-2xl bg-green-500/20 text-green-400">
              <Info size={24} />
            </div>
            <p className="text-xs font-bold">Rules & Help</p>
          </div>
          <div className="glass-card p-4 flex flex-col items-center gap-2 text-center">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
              <History size={24} />
            </div>
            <p className="text-xs font-bold">Transactions</p>
          </div>
        </div>
      </section>

      <div className="glass-card p-4 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5">
            <ArrowDownCircle size={20} />
          </div>
          <span className="text-sm font-medium">Payment Security by Razorpay</span>
        </div>
        <ChevronRight size={20} />
      </div>
    </div>
  );
}
