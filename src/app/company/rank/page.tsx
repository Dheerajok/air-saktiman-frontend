'use client';

import React from 'react';
import { Award, TrendingUp, Building2, Zap, ArrowUpRight } from 'lucide-react';

export default function CSRRankingPage() {
  const corporateRanks = [
    { rank: 1, name: 'GreenTech ESG Solutions', score: 98420, funding: '₹45,00,000', trees: 18000, gap: 0 },
    { rank: 2, name: 'EcoWorks Clean Mobility', score: 91200, funding: '₹38,00,000', trees: 14500, gap: 7220 },
    { rank: 3, name: 'Tata ESG Innovations (You)', score: 88400, funding: '₹42,50,000', trees: 12400, gap: 2800, isCurrent: true },
    { rank: 4, name: 'Mahindra Green Energy', score: 82500, funding: '₹29,00,000', trees: 11000, gap: 5900 },
    { rank: 5, name: 'Infosys Foundation Eco', score: 79100, funding: '₹25,00,000', trees: 9800, gap: 3400 },
  ];

  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white space-y-4">
        <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-xs font-bold">
          Corporate ESG Vanguard
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">National CSR Rankings</h1>
        <p className="text-xs text-[#5F6368]">
          Competitive corporate benchmark evaluating funding volume, employee participation, and measured clean air outcomes.
        </p>

        {/* Current position banner */}
        <div className="p-4 rounded-2xl bg-[#E8F0FE] border border-[#D2E3FC] flex items-center justify-between text-xs font-bold text-[#1967D2]">
          <span>Your Company is Ranked #3 Nationally</span>
          <span>Only 2,800 Impact Points to reach #2 ⚡</span>
        </div>
      </div>

      <div className="gdg-card bg-white divide-y divide-[#F1F3F4] overflow-hidden">
        {corporateRanks.map((c) => (
          <div
            key={c.rank}
            className={`p-5 flex items-center justify-between gap-4 ${c.isCurrent ? 'bg-[#E8F0FE]/40' : 'hover:bg-[#F8FAFD]'}`}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 text-center font-black text-base text-[#5F6368]">#{c.rank}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#202124]">{c.name}</span>
                  {c.isCurrent && (
                    <span className="px-2 py-0.2 rounded-full bg-[#34A853] text-white font-bold text-[10px]">
                      YOUR COMPANY
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#5F6368]">
                  {c.funding} CSR capital • {c.trees.toLocaleString()} Trees Planted
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-black text-[#34A853] block">
                {c.score.toLocaleString()} Impact Pts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
