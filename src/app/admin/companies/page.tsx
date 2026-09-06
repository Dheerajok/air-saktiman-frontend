'use client';

import React from 'react';
import { mockCompany } from '@/lib/mock-data';
import { Building2, Plus, ShieldCheck, TrendingUp } from 'lucide-react';

export default function AdminCompaniesPage() {
  const list = [
    mockCompany,
    { id: 'comp_02', name: 'Infosys Green Foundation', industry: 'IT & Cloud Infrastructure', location: 'Bengaluru', csrRank: 2, totalCsrFunding: '₹60,00,000', employeesCount: 2100 },
    { id: 'comp_03', name: 'Wipro EcoEnergy', industry: 'Renewable Power', location: 'Hyderabad', csrRank: 4, totalCsrFunding: '₹35,00,000', employeesCount: 890 },
  ];

  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">Corporate CSR Partner Management</h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Enterprise CSR agreements, funding disbursement records, and ESG audit compliance.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs shadow-md">
          <Plus className="w-4 h-4" />
          <span>+ Onboard Company</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {list.map((c) => (
          <div key={c.id} className="gdg-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-bold">
                CSR Rank #{c.csrRank}
              </span>
              <span className="font-bold text-[#34A853]">{c.totalCsrFunding}</span>
            </div>
            <h3 className="text-base font-bold text-[#202124]">{c.name}</h3>
            <p className="text-xs text-[#5F6368]">{c.industry} • {c.location}</p>
            <div className="pt-3 border-t border-[#F1F3F4] text-xs text-[#5F6368] flex items-center justify-between">
              <span>{c.employeesCount} Staff Active</span>
              <button className="text-xs font-bold text-[#4285F4] hover:underline">View Ledger →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
