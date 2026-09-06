'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mission } from '@/types';
import { useGamification } from '@/lib/gamification-context';
import {
  Clock,
  MapPin,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  onSelect?: () => void;
}

export function MissionCard({ mission }: MissionCardProps) {
  const { activeMissionIds, completedMissionIds, acceptMission, completeMission } = useGamification();
  const [expanded, setExpanded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const isActive = activeMissionIds.includes(mission.id);
  const isCompleted = completedMissionIds.includes(mission.id);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'EASY':
        return 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]';
      case 'MEDIUM':
        return 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]';
      case 'HARD':
        return 'bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]';
      default:
        return 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC]';
    }
  };

  const handleCompleteWithMockVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      completeMission(mission.id);
    }, 800);
  };

  return (
    <div
      className={`gdg-card p-5 bg-white relative flex flex-col justify-between transition-all duration-200 ${
        isActive ? 'border-[#4285F4] ring-2 ring-[#4285F4]/15 shadow-md' : ''
      } ${isCompleted ? 'bg-[#F8FAFD]/70 opacity-90' : ''}`}
    >
      <div>
        {/* Top Meta */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black text-[#5F6368] tracking-wider">
              {mission.code}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getDifficultyBadge(
                mission.difficulty,
              )}`}
            >
              {mission.difficulty}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F1F3F4] text-[#3C4043]">
              {mission.category}
            </span>
          </div>

          {/* Reward Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F0FE] border border-[#D2E3FC] text-[#1967D2] font-black text-xs shrink-0">
            <Zap className="w-3.5 h-3.5 fill-[#4285F4]" />
            <span>+{mission.xpReward} XP</span>
          </div>
        </div>

        {/* Title & Description */}
        <Link href={`/missions/${mission.id}`} className="group">
          <h3 className="text-base font-bold text-[#202124] group-hover:text-[#4285F4] transition-colors leading-snug">
            {mission.title}
          </h3>
        </Link>
        <p className="text-xs text-[#5F6368] mt-1.5 line-clamp-2 leading-relaxed">
          {mission.description}
        </p>

        {/* Info Pills */}
        <div className="flex items-center gap-4 text-[11px] text-[#5F6368] font-medium my-4 pt-3 border-t border-[#F1F3F4] flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#80868B]" />
            <span>{mission.estimatedMinutes} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
            <span className="truncate max-w-[130px]">{mission.locationZone}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#34A853]" />
            <span>+{mission.impactScore} Impact</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Users className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>{mission.participantsCount} players</span>
          </div>
        </div>

        {/* Expandable Instructions */}
        {expanded && (
          <div className="mb-4 p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] text-xs space-y-2 animate-in fade-in">
            <span className="font-bold text-[#202124] block text-[11px] uppercase tracking-wide">
              Mission Instructions:
            </span>
            <ul className="space-y-1.5 text-[#5F6368]">
              {mission.instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E8F0FE] text-[#1967D2] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-[#5F6368] hover:text-[#202124] flex items-center gap-1 transition-colors"
        >
          <span>{expanded ? 'Hide steps' : 'View steps'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div>
          {isCompleted ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6F4EA] text-[#137333] font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
            </div>
          ) : isActive ? (
            <button
              onClick={handleCompleteWithMockVerify}
              disabled={isVerifying}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs shadow-xs transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVerifying ? 'Verifying Action...' : 'Submit & Claim XP'}</span>
            </button>
          ) : (
            <button
              onClick={() => acceptMission(mission.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-xs transition-all active:scale-95"
            >
              <span>Accept Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
