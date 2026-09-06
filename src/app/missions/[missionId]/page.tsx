'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useGamification } from '@/lib/gamification-context';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Shield,
  Zap,
  Users,
  CheckCircle2,
  Camera,
  Upload,
  Sparkles,
} from 'lucide-react';

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { missions, activeMissionIds, completedMissionIds, acceptMission, completeMission } =
    useGamification();
  const missionId = params?.missionId as string;

  const mission = missions.find((m) => m.id === missionId) || missions[0];
  const isActive = activeMissionIds.includes(mission.id);
  const isCompleted = completedMissionIds.includes(mission.id);

  const [hasUploadedProof, setHasUploadedProof] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFinishMission = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      completeMission(mission.id);
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-[#5F6368] hover:text-[#202124] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Missions Catalog</span>
      </button>

      {/* Mission Detail Hero */}
      <div className="gdg-card p-6 md:p-8 bg-white space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#5F6368] uppercase">{mission.code}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-[11px] font-bold">
              {mission.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1967D2] font-black text-xs">
              <Zap className="w-4 h-4 fill-[#4285F4]" />
              +{mission.xpReward} XP Reward
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-xs">
              <Shield className="w-4 h-4" />
              +{mission.impactScore} Impact
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
          {mission.title}
        </h1>

        <p className="text-sm text-[#5F6368] leading-relaxed font-normal">
          {mission.description}
        </p>

        {/* Quick parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
          <div>
            <span className="text-[10px] font-bold text-[#80868B] block uppercase">Est. Duration</span>
            <span className="text-sm font-bold text-[#202124] flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-[#4285F4]" />
              {mission.estimatedMinutes} Mins
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#80868B] block uppercase">Designated Zone</span>
            <span className="text-sm font-bold text-[#202124] flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-4 h-4 text-[#EA4335]" />
              {mission.locationZone}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#80868B] block uppercase">Active Players</span>
            <span className="text-sm font-bold text-[#202124] flex items-center gap-1.5 mt-0.5">
              <Users className="w-4 h-4 text-[#34A853]" />
              {mission.participantsCount} Joined
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#80868B] block uppercase">Difficulty Tier</span>
            <span className="text-sm font-bold text-[#202124] block mt-0.5">
              {mission.difficulty}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-[#202124] uppercase tracking-wide">
            Action Instructions & Protocols
          </h3>
          <div className="space-y-2">
            {mission.instructions.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]"
              >
                <div className="w-6 h-6 rounded-full bg-[#4285F4] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <p className="text-xs text-[#3C4043] font-medium leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proof of Execution & Action Buttons */}
        <div className="pt-4 border-t border-[#E8EAED] space-y-4">
          <h3 className="text-sm font-bold text-[#202124]">Verification & Proof Submission</h3>

          {!hasUploadedProof ? (
            <div
              onClick={() => setHasUploadedProof(true)}
              className="border-2 border-dashed border-[#DADCE0] hover:border-[#4285F4] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#F8FAFD]"
            >
              <Camera className="w-8 h-8 text-[#80868B] mx-auto mb-2" />
              <span className="text-xs font-bold text-[#202124] block">
                Upload Geo-Tagged Verification Photo
              </span>
              <span className="text-[11px] text-[#5F6368] mt-0.5 block">
                Click to attach photo evidence of your action
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#34A853]" />
                <span className="text-xs font-bold text-[#137333]">
                  Photo Proof Attached & GPS Geo-validated
                </span>
              </div>
              <button
                onClick={() => setHasUploadedProof(false)}
                className="text-xs text-[#5F6368] hover:text-[#202124] font-semibold"
              >
                Change
              </button>
            </div>
          )}

          {/* Action Trigger */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {isCompleted ? (
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E6F4EA] text-[#137333] font-bold text-xs">
                <CheckCircle2 className="w-5 h-5" />
                <span>Mission Completed & Rewards Claimed</span>
              </div>
            ) : isActive ? (
              <button
                onClick={handleFinishMission}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{submitting ? 'Verifying Coordinates...' : 'Submit Mission for XP Reward'}</span>
              </button>
            ) : (
              <button
                onClick={() => acceptMission(mission.id)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <span>Accept Mission</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
