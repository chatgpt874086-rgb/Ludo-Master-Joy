import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Search, User, Circle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ChatPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const chats = [
    { id: 1, name: 'Rahul Sharma', lastMsg: 'Bhai game lagao!', time: '2m ago', online: true },
    { id: 2, name: 'Amit Kumar', lastMsg: 'Withdraw ho gaya?', time: '15m ago', online: false },
    { id: 3, name: 'Sanjay Singh', lastMsg: 'Room code bhejo', time: '1h ago', online: true },
  ];

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-120px)]">
      <header className="space-y-4">
        <h1 className="text-2xl font-bold">Global Chat</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Search users by name or ID..."
            className="ios-input w-full pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {chats.map((chat) => (
          <motion.div 
            key={chat.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <User size={24} className="text-slate-600" />
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full" />
                )}
              </div>
              <div>
                <p className="font-bold">{chat.name}</p>
                <p className="text-xs text-slate-500 truncate max-w-[150px]">{chat.lastMsg}</p>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{chat.time}</span>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-2 flex items-center gap-2">
        <input 
          type="text" 
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="p-3 bg-blue-600 rounded-xl text-white active:scale-90 transition-all">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
