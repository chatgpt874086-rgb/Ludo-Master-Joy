import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Gift, Share2, Copy, CheckCircle2, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ReferralPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://ludojoy.app/signup?ref=${user?.user_id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex p-6 rounded-[2.5rem] bg-gradient-to-br from-yellow-400 to-orange-600 shadow-2xl shadow-orange-500/20">
          <Gift size={64} className="text-white" />
        </div>
        <h1 className="text-3xl font-black">Refer & Earn</h1>
        <p className="text-slate-400 px-6">Invite your friends and get <span className="text-white font-bold">2% Commission</span> on every bet they play!</p>
      </header>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">Your Referral Code</p>
          <div className="flex gap-2">
            <div className="flex-1 ios-input py-4 font-mono text-xl font-bold tracking-widest flex items-center justify-center">
              {user?.user_id || '12345'}
            </div>
            <button 
              onClick={copyToClipboard}
              className="bg-blue-600 p-4 rounded-2xl text-white active:scale-95 transition-all"
            >
              {copied ? <CheckCircle2 /> : <Copy />}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-[#25D366] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
            WhatsApp
          </button>
          <button className="flex-1 bg-[#0088cc] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
            Telegram
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-5 space-y-2">
          <Users className="text-blue-400" size={24} />
          <p className="text-2xl font-black">12</p>
          <p className="text-xs text-slate-500 font-bold uppercase">Total Referrals</p>
        </div>
        <div className="glass-card p-5 space-y-2">
          <TrendingUp className="text-green-400" size={24} />
          <p className="text-2xl font-black">₹450</p>
          <p className="text-xs text-slate-500 font-bold uppercase">Total Earnings</p>
        </div>
      </div>

      <section className="glass-card p-6 space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <Share2 size={18} className="text-blue-400" />
          How it works
        </h3>
        <div className="space-y-4">
          {[
            { step: '01', title: 'Share Link', desc: 'Send your referral link to friends.' },
            { step: '02', title: 'They Join', desc: 'Friend signs up using your code.' },
            { step: '03', title: 'Earn Money', desc: 'Get 2% commission on their bets.' }
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="text-2xl font-black text-white/10">{item.step}</span>
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
