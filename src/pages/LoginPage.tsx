import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Lock, ArrowRight, Gamepad2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password })
      });
      const data = await res.json();
      if (data.success) {
        login(data.user);
        navigate('/');
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex p-6 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/40 animate-float">
          <Gamepad2 size={64} className="text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter">Ludo Joy</h1>
        <p className="text-slate-400">Play Ludo, Win Real Cash</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="tel" 
              placeholder="Mobile Number"
              className="ios-input w-full pl-12 py-4"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="password" 
              placeholder="Password"
              className="ios-input w-full pl-12 py-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-3xl font-bold text-xl transition-all active:scale-95 shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-2"
        >
          {loading ? 'Logging in...' : (
            <>
              Login <ArrowRight size={24} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-slate-400">
        Don't have an account? {' '}
        <Link to="/signup" className="text-blue-400 font-bold hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}
