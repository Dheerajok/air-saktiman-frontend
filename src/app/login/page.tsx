'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGamification } from '@/lib/gamification-context';
import { Shield, Building2, UserCheck, ArrowRight, Lock, Mail } from 'lucide-react';

import { authApi } from '@/lib/api/auth';

export default function LoginPage() {
  const router = useRouter();
  const { setRole, refreshPlayerData, addToast } = useGamification();
  const [email, setEmail] = useState('player@airguard.org');
  const [password, setPassword] = useState('Player@123456');
  const [selectedRole, setSelectedRole] = useState<'PLAYER' | 'COMPANY_ADMIN' | 'ADMIN'>('PLAYER');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: 'PLAYER' | 'COMPANY_ADMIN' | 'ADMIN') => {
    setSelectedRole(role);
    if (role === 'PLAYER') {
      setEmail('player@airguard.org');
      setPassword('Player@123456');
    } else if (role === 'COMPANY_ADMIN') {
      setEmail('csr@ecocorp.com');
      setPassword('Company@123456');
    } else if (role === 'ADMIN') {
      setEmail('admin@gmail.com');
      setPassword('admin@123');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await authApi.login({ email, password });
      await refreshPlayerData();
      addToast({
        title: 'Logged in successfully',
        description: `Welcome back, ${res.user?.name}!`,
        type: 'success',
      });

      if (res.user?.role === 'COMPANY_ADMIN' || selectedRole === 'COMPANY_ADMIN') {
        router.push('/company');
      } else if (res.user?.role === 'ADMIN' || selectedRole === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      addToast({
        title: 'Login Failed',
        description: err.message || 'Invalid email or password',
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
          Welcome Back, Guardian
        </h2>
        <p className="text-xs text-[#5F6368] text-center mt-1 font-medium">
          Choose your perspective and enter your credentials to play.
        </p>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED] my-6">
          <button
            type="button"
            onClick={() => handleRoleSelect('PLAYER')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedRole === 'PLAYER'
                ? 'bg-white text-[#4285F4] shadow-xs border border-[#D2E3FC]'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Shield className="w-4 h-4 mb-1" />
            <span>Player</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('COMPANY_ADMIN')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedRole === 'COMPANY_ADMIN'
                ? 'bg-white text-[#34A853] shadow-xs border border-[#CEEAD6]'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Building2 className="w-4 h-4 mb-1" />
            <span>Company</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('ADMIN')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedRole === 'ADMIN'
                ? 'bg-white text-[#EA4335] shadow-xs border border-[#FAD2CF]'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <UserCheck className="w-4 h-4 mb-1" />
            <span>Admin</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com"
                className="w-full h-11 pl-10 pr-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none transition-colors"
              />
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
                className="w-full h-11 pl-10 pr-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Enter as {selectedRole.replace('_', ' ')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-[#F1F3F4]">
          <span className="text-xs text-[#5F6368]">Don&apos;t have an account? </span>
          <Link href="/register" className="text-xs font-bold text-[#4285F4] hover:underline">
            Register as Player
          </Link>
        </div>
      </div>
    </div>
  );
}
