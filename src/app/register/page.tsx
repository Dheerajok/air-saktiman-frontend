'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGamification } from '@/lib/gamification-context';
import { ArrowRight, User, Mail, Lock, MapPin } from 'lucide-react';

import { authApi } from '@/lib/api/auth';

export default function RegisterPage() {
  const router = useRouter();
  const { refreshPlayerData, addToast } = useGamification();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Player@123456');
  const [zone, setZone] = useState('Zone 04 - Dwarka Greens');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.register({
        name,
        email,
        password,
        role: 'PLAYER' as any,
      });
      await authApi.updateProfile({ assignedZone: zone });
      await refreshPlayerData();

      addToast({
        title: '🌱 Welcome to AirGuard!',
        description: 'Your Guardian account has been created. +100 XP Welcome Bonus!',
        type: 'success',
        xpReward: 100,
      });
      router.push('/dashboard');
    } catch (err: any) {
      addToast({
        title: 'Registration Error',
        description: err.message || 'Could not create account',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] flex flex-col justify-center items-center p-4">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-[#E8EAED] shadow-sm">
          <div className="grid grid-cols-2 gap-1 p-1.5">
            <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
            <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
            <div className="w-2 h-2 rounded-full bg-[#FBBC05]" />
            <div className="w-2 h-2 rounded-full bg-[#34A853]" />
          </div>
        </div>
        <span className="font-black text-2xl tracking-tight text-[#202124]">
          Air<span className="text-[#4285F4]">Guard</span>
        </span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E8EAED]">
        <h2 className="text-2xl font-black text-[#202124] tracking-tight text-center">
          Join the Clean Air Quest
        </h2>
        <p className="text-xs text-[#5F6368] text-center mt-1 font-medium">
          Create your player identity, claim your home zone, and begin earning impact XP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">Guardian Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full h-11 pl-10 pr-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full h-11 pl-10 pr-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">Assigned Zone</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none transition-colors appearance-none"
              >
                <option>Zone 01 - Connaught & Central Hub</option>
                <option>Zone 02 - Okhla Industrial Belt</option>
                <option>Zone 03 - Rohini Eco Zone</option>
                <option>Zone 04 - Dwarka Greens</option>
                <option>Zone 05 - Noida Tech Corridor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter strong password"
                className="w-full h-11 pl-10 pr-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Create Profile & Claim 100 XP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-[#F1F3F4]">
          <span className="text-xs text-[#5F6368]">Already a member? </span>
          <Link href="/login" className="text-xs font-bold text-[#4285F4] hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
