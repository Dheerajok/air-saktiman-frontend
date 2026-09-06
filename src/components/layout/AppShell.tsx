'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { useGamification } from '@/lib/gamification-context';
import { Sparkles, Trophy, X, Zap, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toasts, dismissToast, showLevelUpModal, closeLevelUpModal, player } = useGamification();
  const [authChecked, setAuthChecked] = useState(false);

  const isAuthRoute = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('airguard_token') : null;
    if (!token && !isAuthRoute) {
      router.replace('/login');
    } else {
      setAuthChecked(true);
    }
  }, [pathname, isAuthRoute, router]);

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-white text-[#202124]">
        {children}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#F8FAFD] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-[#5F6368]">Verifying AirGuard Guardian Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#202124]">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 pb-16 md:pb-6">
        <Header onToggleSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <MobileNav />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Level Up Celebration Modal */}
      <AnimatePresence>
        {showLevelUpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#FBBC05] text-center overflow-hidden"
            >
              {/* Confetti background glow */}
              <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#FBBC05]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-[#34A853]/20 rounded-full blur-2xl pointer-events-none" />

              <button
                onClick={closeLevelUpModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F1F3F4] text-[#80868B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex p-4 rounded-3xl bg-[#FEF7E0] border border-[#FEEFC3] text-[#B06000] mb-4">
                <Trophy className="w-12 h-12 stroke-[2.2]" />
              </div>

              <h3 className="text-2xl font-black text-[#202124] tracking-tight">
                LEVEL UP! 🎉
              </h3>
              <p className="text-sm font-semibold text-[#34A853] mt-1">
                You reached LEVEL {player.level} • {player.rank}
              </p>

              <p className="text-xs text-[#5F6368] mt-3 leading-relaxed">
                Your actions contributed directly to cleaner air in your community. You unlocked higher-tier quests and bonus multiplier points!
              </p>

              <div className="mt-6 flex items-center justify-center gap-3 p-3 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1967D2]">
                  <Zap className="w-4 h-4 fill-[#4285F4]" />
                  <span>Next: Level {player.level + 1}</span>
                </div>
                <span className="text-[#80868B]">•</span>
                <span className="text-xs font-semibold text-[#5F6368]">
                  Target: {player.nextLevelXp.toLocaleString()} XP
                </span>
              </div>

              <button
                onClick={closeLevelUpModal}
                className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                Continue Playing
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Array<{ id: string; title: string; description: string; type: string; xpReward?: number }>;
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-2xl shadow-xl border border-[#E8EAED] relative overflow-hidden"
          >
            {/* Left accent bar */}
            <div
              className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                toast.type === 'success'
                  ? 'bg-[#34A853]'
                  : toast.type === 'reward'
                  ? 'bg-[#FBBC05]'
                  : 'bg-[#4285F4]'
              }`}
            />
            <div className="p-1 rounded-full bg-[#E6F4EA] text-[#34A853] shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-[#202124]">{toast.title}</span>
                {toast.xpReward && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-black text-[10px]">
                    +{toast.xpReward} XP
                  </span>
                )}
              </div>
              <p className="text-[#5F6368] mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#80868B] hover:text-[#202124] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
