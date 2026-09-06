'use client';

import React from 'react';
import { mockCompany } from '@/lib/mock-data';
import { TrendingUp, Trees, Leaf, ShieldCheck, Download, Award } from 'lucide-react';

export default function CSRDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-xs">
            Corporate ESG & CSR Analytics
          </span>
          <h1 className="text-2xl font-black text-[#202124] mt-1">Sustainability & CSR Report</h1>
          <p className="text-xs text-[#5F6368] mt-0.5">
            Real-time compliance tracking, scope 3 employee impact, and carbon offset ledgers.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#F8FAFD] border border-[#DADCE0] text-xs font-bold text-[#3C4043]">
          <Download className="w-3.5 h-3.5" />
          <span>Download ESG Audit (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="gdg-card p-6 bg-white space-y-2">
          <span className="text-xs font-bold text-[#80868B] uppercase">Scope 3 Commute Offset</span>
          <span className="text-3xl font-black text-[#34A853] block">142.8 Tons</span>
          <p className="text-xs text-[#5F6368]">
            Achieved through 4,200 logged metro and EV carpool employee trips.
          </p>
        </div>

        <div className="gdg-card p-6 bg-white space-y-2">
          <span className="text-xs font-bold text-[#80868B] uppercase">Tree Survival Rate</span>
          <span className="text-3xl font-black text-[#4285F4] block">94.2%</span>
          <p className="text-xs text-[#5F6368]">
            Verified via geotagged quarterly satellite imagery audits in Zone 04.
          </p>
        </div>

        <div className="gdg-card p-6 bg-white space-y-2">
          <span className="text-xs font-bold text-[#80868B] uppercase">Community ESG Trust</span>
          <span className="text-3xl font-black text-[#FBBC05] block">A+ Tier</span>
          <p className="text-xs text-[#5F6368]">
            Ranked #3 across national corporate environmental coalitions.
          </p>
        </div>
      </div>
    </div>
  );
}
