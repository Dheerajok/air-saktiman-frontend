'use client';

import React, { useState } from 'react';
import { mockAIRecommendations } from '@/lib/mock-data';
import { useGamification } from '@/lib/gamification-context';
import { AIRecommendation } from '@/types';
import {
  Cpu,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Wind,
  ShieldCheck,
  Plus,
} from 'lucide-react';

export default function AIDecisionCenterPage() {
  const { addToast } = useGamification();
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(mockAIRecommendations);

  const handleAction = (id: string, action: 'ACCEPTED' | 'REJECTED') => {
    setRecommendations((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, status: action };
        }
        return r;
      }),
    );

    addToast({
      title: action === 'ACCEPTED' ? '✅ Mission Created from AI Decision' : 'AI Recommendation Dismissed',
      description:
        action === 'ACCEPTED'
          ? 'Automated task has been published to the Citizen Mission pool.'
          : 'Recommendation marked as rejected.',
      type: action === 'ACCEPTED' ? 'success' : 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gdg-card p-6 md:p-8 bg-white space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
            AI Predictive Engine Active
          </span>
          <span className="text-xs text-[#80868B] font-medium">• Model v4.8</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
          AI Decision Support Center
        </h1>
        <p className="text-xs text-[#5F6368] max-w-2xl leading-relaxed">
          The AI synthesizes real-time IoT AQI streams, citizen reports, weather inversions, and historical trends to propose targeted municipal and community intervention missions.
        </p>

        {/* Ethical / Assistive AI Disclaimer */}
        <div className="p-3.5 rounded-2xl bg-[#FEF7E0] border border-[#FEEFC3] text-xs text-[#B06000] flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#FBBC05] shrink-0 mt-0.5" />
          <span>
            <strong>Advisory Notice:</strong> AI outputs are machine-generated decision-support recommendations. Human verification and approval is required before task publication.
          </span>
        </div>
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-5">
        <h2 className="text-sm font-bold text-[#202124] uppercase tracking-wider">
          Pending AI Interventions ({recommendations.filter((r) => r.status === 'PENDING_APPROVAL').length})
        </h2>

        <div className="space-y-5">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="gdg-card p-6 bg-white space-y-5 border-l-4 border-l-[#4285F4]"
            >
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-[#202124]">{rec.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F8FAFD] text-[#5F6368] font-bold text-[10px] border border-[#E8EAED]">
                    {rec.zone}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1967D2] font-black text-xs">
                    <Sparkles className="w-3.5 h-3.5 fill-[#4285F4]" />
                    <span>{rec.confidenceScore}% Confidence</span>
                  </div>
                </div>
              </div>

              {/* Issue & Recommended Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] space-y-1.5">
                  <span className="text-[10px] font-bold text-[#80868B] uppercase tracking-wider block">
                    Detected Anomaly & Trigger
                  </span>
                  <p className="text-xs text-[#202124] leading-relaxed font-semibold">{rec.issue}</p>
                  <span className="text-[11px] text-[#5F6368] block mt-1">
                    Trigger: {rec.triggerEvent}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] space-y-1.5">
                  <span className="text-[10px] font-bold text-[#137333] uppercase tracking-wider block">
                    Recommended Community Action
                  </span>
                  <p className="text-xs text-[#137333] font-bold leading-relaxed">
                    {rec.recommendedAction}
                  </p>
                  <span className="text-[11px] text-[#137333] block mt-1">
                    Expected Impact: {rec.expectedImpact}
                  </span>
                </div>
              </div>

              {/* Supporting Data Points */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#202124] uppercase tracking-wide">
                  Supporting Telemetry & Evidence
                </span>
                <ul className="space-y-1.5 text-xs text-[#5F6368]">
                  {(rec.supportingData || []).map((d, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Human Approval Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F1F3F4]">
                <span className="text-[11px] text-[#80868B]">Generated {rec.generatedAt}</span>

                {rec.status === 'PENDING_APPROVAL' ? (
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleAction(rec.id, 'REJECTED')}
                      className="px-4 py-2 rounded-xl border border-[#DADCE0] hover:bg-[#F8FAFD] text-xs font-bold text-[#5F6368] transition-colors"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => handleAction(rec.id, 'ACCEPTED')}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Accept & Create Community Mission</span>
                    </button>
                  </div>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      rec.status === 'ACCEPTED'
                        ? 'bg-[#E6F4EA] text-[#137333]'
                        : 'bg-[#FCE8E6] text-[#C5221F]'
                    }`}
                  >
                    {rec.status === 'ACCEPTED' ? 'Approved & Published' : 'Rejected'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
