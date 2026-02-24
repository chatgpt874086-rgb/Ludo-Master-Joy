import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trophy, Gamepad2, Star, Zap } from 'lucide-react';

export default function HomePage() {
  const games = [
    {
      id: 'classic',
      name: 'Classic Ludo',
      icon: Trophy,
      color: 'from-blue-500 to-indigo-600',
      tag: 'Most Played'
    },
    {
      id: 'popular',
      name: 'Popular Ludo',
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-600',
      tag: 'New'
    }
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ludo Joy</h1>
          <p className="text-slate-400 text-sm">Welcome back, Player!</p>
        </div>
        <div className="glass-card p-2 px-4 flex items-center gap-2">
          <Star className="text-yellow-400 fill-yellow-400" size={16} />
          <span className="font-bold">₹1,240</span>
        </div>
      </header>

      <div className="grid gap-6">
        {games.map((game) => (
          <Link key={game.id} to={`/game/${game.id}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`glass-card p-6 relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${game.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${game.color} shadow-lg shadow-blue-500/20`}>
                    <game.icon className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{game.name}</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-slate-300">
                      {game.tag}
                    </span>
                  </div>
                </div>
                <Zap className="text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <section className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          Top Winners
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">
                  {i}
                </div>
                <div>
                  <p className="font-medium">User_{i}42</p>
                  <p className="text-xs text-slate-500">Won 12 games today</p>
                </div>
              </div>
              <p className="text-green-400 font-bold">₹{5000 / i}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
