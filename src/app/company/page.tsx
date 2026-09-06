'use client';

import React from 'react';
import Link from 'next/link';
import { mockCompany, mockCsrProjects } from '@/lib/mock-data';
import {
  Building2,
  TrendingUp,
  Users,
  CircleDollarSign,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Trees,
  Globe2,
} from 'lucide-react';

export default function CompanyOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Company Overview Hero */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-[#E6F4EA] border border-[#CEEAD6] flex items-center justify-center text-3xl shadow-xs">
            {mockCompany.logo}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-[#202124] tracking-tight">
                {mockCompany.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-[11px] border border-[#CEEAD6]">
                CSR Rank #{mockCompany.csrRank}
              </span>
            </div>
            <p className="text-xs text-[#5F6368] font-medium mt-1">
              {mockCompany.industry} • {mockCompany.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/company/funds"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <CircleDollarSign className="w-4 h-4" />
            <span>Fund New Project</span>
          </Link>
        </div>
      </div>

      {/* Corporate Impact Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Total CSR Committed</span>
          <span className="text-2xl font-black text-[#202124] block my-1">
            {mockCompany.totalCsrFunding}
          </span>
          <span className="text-xs text-[#34A853] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +18% from last quarter
          </span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Participating Employees</span>
          <span className="text-2xl font-black text-[#4285F4] block my-1">
            {mockCompany.employeesCount.toLocaleString()}
          </span>
          <span className="text-xs text-[#5F6368]">84% active in clean air tasks</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Organizations Supported</span>
          <span className="text-2xl font-black text-[#FBBC05] block my-1">
            {mockCompany.organizationsSupported}
          </span>
          <span className="text-xs text-[#5F6368]">Verified NGO partners</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Corporate Impact Score</span>
          <span className="text-2xl font-black text-[#34A853] block my-1">
            {mockCompany.impactScore.toLocaleString()}
          </span>
          <span className="text-xs text-[#34A853] font-bold">Top 3 Enterprise Tier</span>
        </div>
      </div>

      {/* Active Funded Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-[#202124] tracking-tight">
            Active Corporate-Funded Clean Air Initiatives
          </h2>
          <Link href="/company/funds" className="text-xs font-bold text-[#4285F4] hover:underline">
            View All Projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockCsrProjects.map((proj) => {
            const pct = Math.round((proj.fundedAmount / proj.requiredFunds) * 100);
            return (
              <div
                key={proj.id}
                className="gdg-card p-5 bg-white flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold mb-2">
                    <span className="text-[#5F6368]">{proj.organization}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] text-[10px]">
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#202124] leading-snug">{proj.title}</h3>
                  <p className="text-xs text-[#5F6368] mt-1 line-clamp-2 leading-relaxed">
                    {proj.targetImpact}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#202124]">₹{proj.fundedAmount.toLocaleString()}</span>
                      <span className="text-[#80868B]">Goal: ₹{proj.requiredFunds.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#F1F3F4] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#34A853]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F1F3F4] flex items-center justify-between text-xs">
                  <span className="text-[#5F6368] font-medium">{proj.location}</span>
                  <span className="font-bold text-[#1967D2]">{pct}% Funded</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
