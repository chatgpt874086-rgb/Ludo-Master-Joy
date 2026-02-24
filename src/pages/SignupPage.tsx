import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Phone, Lock, ArrowRight, Gamepad2, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, mobile, password, referralCode })
      });
      const data = await res.json();
      if (data.success) {
        login(data.user);
        navigate('/');
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tighter">Create Account</h1>
        <p className="text-slate-400">Join the Ludo Joy community</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Username"
            className="ios-input w-full pl-12 py-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="password" 
            placeholder="Confirm Password"
            className="ios-input w-full pl-12 py-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <Gift className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Referral Code (Optional)"
            className="ios-input w-full pl-12 py-4"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-3xl font-bold text-xl transition-all active:scale-95 shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-2 mt-4"
        >
          {loading ? 'Creating Account...' : (
            <>
              Sign Up <ArrowRight size={24} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-slate-400">
        Already have an account? {' '}
        <Link to="/login" className="text-blue-400 font-bold hover:underline">Login</Link>
      </p>
    </div>
  );
}
