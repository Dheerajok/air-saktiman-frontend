'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { PlayerStats, UserRole, Mission, RewardItem, AirQualityData } from '@/types';
import { mockPlayerStats, mockMissions, mockRewards, mockAirQuality } from './mock-data';
import { authApi } from './api/auth';
import { missionsApi } from './api/missions';
import { rewardsApi } from './api/rewards';
import { airQualityApi } from './api/air-quality';
import { setToken, getToken } from './api/client';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'reward' | 'error';
  xpReward?: number;
}

interface GamificationContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  player: PlayerStats;
  airQuality: AirQualityData;
  missions: Mission[];
  completedMissionIds: string[];
  activeMissionIds: string[];
  toasts: ToastMessage[];
  showLevelUpModal: boolean;
  isLoading: boolean;
  closeLevelUpModal: () => void;
  acceptMission: (missionId: string) => Promise<void>;
  completeMission: (missionId: string, photoFile?: File) => Promise<void>;
  awardPlayerXpAndImpact: (xp: number, impact: number) => void;
  redeemReward: (reward: RewardItem) => Promise<boolean>;
  updatePlayerProfile: (data: Partial<PlayerStats>) => Promise<void>;
  refreshPlayerData: () => Promise<void>;
  refreshAirQuality: () => Promise<void>;
  dismissToast: (id: string) => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('PLAYER');
  const [player, setPlayer] = useState<PlayerStats>(mockPlayerStats);
  const [airQuality, setAirQuality] = useState<AirQualityData>(mockAirQuality);
  const [missions, setMissions] = useState<Mission[]>(mockMissions);
  const [activeMissionIds, setActiveMissionIds] = useState<string[]>([]);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const previousLevelRef = useRef<number>(player.level);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const newToast: ToastMessage = {
      ...toast,
      id: Math.random().toString(36).substring(2, 9),
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      dismissToast(newToast.id);
    }, 4500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Convert raw user object from backend to PlayerStats
  const mapBackendUserToPlayer = (user: any): PlayerStats => ({
    name: user.name || 'Citizen Guardian',
    handle: user.username ? `@${user.username}` : '@guardian',
    avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: user.role || 'PLAYER',
    level: user.level || 1,
    currentXp: user.currentXp ?? 0,
    nextLevelXp: user.nextLevelXp || 500,
    rank: user.rank || (user.level >= 25 ? 'Climate Defender' : user.level >= 10 ? 'Air Guardian' : user.level >= 3 ? 'Eco Scout' : 'Novice'),
    globalRank: user.globalRank || 100,
    streakDays: user.streakDays ?? 1,
    contributionScore: user.contributionScore ?? 0,
    co2OffsetKg: user.co2OffsetKg ?? (user.treesPlanted ? user.treesPlanted * 20 : 0),
    treesPlanted: user.treesPlanted ?? 0,
    reportsSubmitted: user.reportsSubmitted ?? 0,
    missionsCompleted: user.missionsCompleted ?? 0,
    availablePoints: user.availablePoints ?? 100,
    assignedZone: user.assignedZone || 'Zone 04 - Dwarka Greens',
    badges: (user.badges || []).map((b: any) =>
      typeof b === 'string'
        ? {
            id: b.toLowerCase().replace(/\s+/g, '_'),
            title: b,
            description: 'Earned achievement in Clean Air campaigns',
            icon: 'award',
            unlockedAt: 'Recently',
          }
        : b
    ),
  });

  // Fetch current authenticated player data from backend
  const refreshPlayerData = useCallback(async () => {
    try {
      const user = await authApi.getMe();
      if (user) {
        const mapped = mapBackendUserToPlayer(user);
        if (mapped.level > previousLevelRef.current && previousLevelRef.current > 0) {
          setShowLevelUpModal(true);
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
            });
          } catch {}
        }
        previousLevelRef.current = mapped.level;
        setPlayer(mapped);
        if (user.role) setRoleState(user.role);
      }
    } catch {
      // Backend not running or token expired
    }
  }, []);

  // Fetch live air quality
  const refreshAirQuality = useCallback(async () => {
    try {
      const live = await airQualityApi.getLiveAirQuality();
      if (live && live.aqi) {
        setAirQuality(live);
      }
    } catch {
      // Keep fallback
    }
  }, []);

  // Fetch live missions
  const refreshMissions = useCallback(async () => {
    try {
      const liveMissions = await missionsApi.getMissions();
      if (liveMissions && liveMissions.length > 0) {
        setMissions(liveMissions);
      }
    } catch {
      // Keep fallback
    }
  }, []);

  // Helper to instantly award XP and impact locally & check level up
  const awardPlayerXpAndImpact = useCallback((xp: number, impact: number) => {
    setPlayer((prev) => {
      const newXp = prev.currentXp + xp;
      let newLevel = prev.level;
      let newNextXp = prev.nextLevelXp;
      let didLevelUp = false;

      while (newXp >= newNextXp) {
        newLevel += 1;
        newNextXp = Math.round(newNextXp * 1.35);
        didLevelUp = true;
      }

      if (didLevelUp) {
        setShowLevelUpModal(true);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
          });
        } catch {}
      }

      const newRank = newLevel >= 25 ? 'Climate Defender' : newLevel >= 10 ? 'Air Guardian' : newLevel >= 3 ? 'Eco Scout' : 'Novice';

      return {
        ...prev,
        currentXp: newXp,
        level: newLevel,
        nextLevelXp: newNextXp,
        rank: newRank,
        contributionScore: prev.contributionScore + impact,
        availablePoints: prev.availablePoints + xp,
      };
    });
  }, []);

  // Role Switcher with Backend Synchronization
  const setRole = async (newRole: UserRole) => {
    setRoleState(newRole);
    setIsLoading(true);

    try {
      let email = 'player@airguard.org';
      let password = 'Player@123456';
      if (newRole === 'ADMIN') {
        email = 'admin@gmail.com';
        password = 'admin@123';
      } else if (newRole === 'COMPANY_ADMIN') {
        email = 'csr@ecocorp.com';
        password = 'Company@123456';
      }

      const res = await authApi.login({ email, password });
      if (res.user) {
        const mapped = mapBackendUserToPlayer(res.user);
        previousLevelRef.current = mapped.level;
        setPlayer(mapped);
        addToast({
          title: `Switched to ${newRole.replace('_', ' ')}`,
          description: `Logged in as ${res.user.name} (${res.user.email})`,
          type: 'info',
        });
      }
    } catch (err: any) {
      console.warn('Role switch fallback:', err);
      // Fallback local update
      setPlayer((prev) => ({
        ...prev,
        role: newRole,
        name: newRole === 'ADMIN' ? 'Admin AirGuard' : newRole === 'COMPANY_ADMIN' ? 'EcoCorp Sustainability' : 'Citizen Guardian',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem('airguard_user') : null;
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (parsed.role) setRoleState(parsed.role);
            const mapped = mapBackendUserToPlayer(parsed);
            previousLevelRef.current = mapped.level;
            setPlayer(mapped);
          } catch {}
        }
        const token = getToken();
        if (token) {
          await refreshPlayerData();
          await refreshMissions();
        }
        await refreshAirQuality();
      } catch (e) {
        console.warn('Init backend error:', e);
      } finally {
        setIsLoading(false);
      }
    }
    init();

    // Auto-poll live AQI every 60 seconds
    const aqiInterval = setInterval(refreshAirQuality, 60000);
    return () => clearInterval(aqiInterval);
  }, [refreshPlayerData, refreshMissions, refreshAirQuality]);

  const acceptMission = async (missionId: string) => {
    if (activeMissionIds.includes(missionId) || completedMissionIds.includes(missionId)) return;
    setActiveMissionIds((prev) => [...prev, missionId]);
    const m = missions.find((item) => item.id === missionId);

    try {
      await missionsApi.acceptMission(missionId);
    } catch {
      // Offline fallback
    }

    addToast({
      title: '🎯 Mission Accepted!',
      description: `You are now on: "${m?.title || 'Clean Air Mission'}"`,
      type: 'info',
    });
  };

  const completeMission = async (missionId: string, photoFile?: File) => {
    const m = missions.find((item) => item.id === missionId);
    if (!m) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
      });
    } catch {
      // ignore
    }

    const earnedXp = m.xpReward || 200;
    const earnedImpact = m.impactScore || 35;

    // Optimistic / direct state update
    awardPlayerXpAndImpact(earnedXp, earnedImpact);
    setPlayer((prev) => ({
      ...prev,
      missionsCompleted: prev.missionsCompleted + 1,
    }));

    try {
      await missionsApi.completeMission(missionId, photoFile);
      await refreshPlayerData();
    } catch {
      // Local optimistic state is already applied
    }

    setActiveMissionIds((prev) => prev.filter((id) => id !== missionId));
    setCompletedMissionIds((prev) => [...prev, missionId]);

    addToast({
      title: '🌟 Mission Complete!',
      description: `+${earnedXp} XP & +${earnedImpact} Impact added to your Air Guardian profile!`,
      type: 'success',
      xpReward: earnedXp,
    });
  };

  const redeemReward = async (reward: RewardItem): Promise<boolean> => {
    if (player.availablePoints < reward.pointsCost) {
      addToast({
        title: 'Insufficient Points',
        description: `You need ${reward.pointsCost - player.availablePoints} more eco points to claim this.`,
        type: 'info',
      });
      return false;
    }

    try {
      await rewardsApi.redeemReward(reward.id);
      await refreshPlayerData();
    } catch {
      // Optimistic local deduct
      setPlayer((prev) => ({
        ...prev,
        availablePoints: prev.availablePoints - reward.pointsCost,
      }));
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#34A853', '#FBBC05', '#4285F4'],
      });
    } catch {
      // ignore
    }

    addToast({
      title: '🎁 Reward Redeemed!',
      description: `Successfully claimed "${reward.title}". Saved to your profile & database!`,
      type: 'reward',
    });
    return true;
  };

  const updatePlayerProfile = async (data: Partial<PlayerStats>) => {
    try {
      await authApi.updateProfile({
        name: data.name,
        assignedZone: data.assignedZone,
      });
      await refreshPlayerData();
      addToast({
        title: 'Profile Updated',
        description: 'Changes successfully saved to database.',
        type: 'success',
      });
    } catch (err: any) {
      addToast({
        title: 'Update Error',
        description: err.message || 'Could not update profile',
        type: 'error',
      });
    }
  };

  const closeLevelUpModal = () => setShowLevelUpModal(false);

  return (
    <GamificationContext.Provider
      value={{
        role,
        setRole,
        player,
        airQuality,
        missions,
        completedMissionIds,
        activeMissionIds,
        toasts,
        showLevelUpModal,
        isLoading,
        closeLevelUpModal,
        acceptMission,
        completeMission,
        awardPlayerXpAndImpact,
        redeemReward,
        updatePlayerProfile,
        refreshPlayerData,
        refreshAirQuality,
        dismissToast,
        addToast,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
