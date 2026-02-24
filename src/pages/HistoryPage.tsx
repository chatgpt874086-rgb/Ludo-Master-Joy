import { useState } from 'react';
import { motion } from 'motion/react';
import { History as HistoryIcon, ArrowDownLeft, ArrowUpRight, Search } from 'lucide-react';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  const history = [
    { id: 1, type: 'deposit', amount: 500, status: 'success', date: '2024-03-20 14:30' },
    { id: 2, type: 'withdraw', amount: 200, status: 'pending', date: '2024-03-19 10:15' },
    { id: 3, type: 'deposit', amount: 1000, status: 'success', date: '2024-03-18 18:45' },
  ];

  const filteredHistory = history.filter(h => h.type === activeTab);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </header>

      <div className="flex p-1 bg-white/5 rounded-2xl">
        <button 
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'deposit' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400'}`}
        >
          Deposits
        </button>
        <button 
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'withdraw' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400'}`}
        >
          Withdrawals
        </button>
      </div>

      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${item.type === 'deposit' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                {item.type === 'deposit' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
              </div>
              <div>
                <p className="font-bold">₹{item.amount}</p>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                item.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
              }`}>
                {item.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
