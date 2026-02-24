import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Camera, LogOut, ChevronRight, TrendingUp, TrendingDown, Award, Edit3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const statsData = [
    { name: 'Deposit', value: 5000, color: '#3b82f6' },
    { name: 'Withdraw', value: 3000, color: '#8b5cf6' },
    { name: 'Win', value: 4500, color: '#10b981' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <User size={64} className="text-slate-700" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full border-4 border-slate-950 text-white shadow-xl">
            <Camera size={18} />
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user?.username || 'User Name'}</h1>
          <p className="text-slate-500 font-mono text-sm">ID: {user?.user_id || '12345'}</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center space-y-1">
          <TrendingUp className="text-blue-400 mx-auto" size={20} />
          <p className="text-[10px] text-slate-500 uppercase font-bold">Deposit</p>
          <p className="font-bold">₹5,000</p>
        </div>
        <div className="glass-card p-4 text-center space-y-1">
          <TrendingDown className="text-purple-400 mx-auto" size={20} />
          <p className="text-[10px] text-slate-500 uppercase font-bold">Withdraw</p>
          <p className="font-bold">₹3,000</p>
        </div>
        <div className="glass-card p-4 text-center space-y-1">
          <Award className="text-green-400 mx-auto" size={20} />
          <p className="text-[10px] text-slate-500 uppercase font-bold">Win</p>
          <p className="font-bold">₹4,500</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4">Performance Overview</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          {statsData.map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-xs text-slate-400">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full glass-card p-4 flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Edit3 size={20} />
            </div>
            <span className="font-bold">Edit Profile</span>
          </div>
          <ChevronRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
        </button>
        
        <button 
          onClick={logout}
          className="w-full glass-card p-4 flex items-center justify-between group border-red-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
              <LogOut size={20} />
            </div>
            <span className="font-bold text-red-400">Logout</span>
          </div>
          <ChevronRight size={20} className="text-slate-600 group-hover:text-red-400 transition-colors" />
        </button>
      </div>
    </div>
  );
}
