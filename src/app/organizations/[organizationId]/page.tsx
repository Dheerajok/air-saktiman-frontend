'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Globe2, MapPin, CircleDollarSign } from 'lucide-react';

export default function OrganizationDetailPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-[#5F6368] hover:text-[#202124]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Organizations Directory</span>
      </button>

      <div className="gdg-card p-6 md:p-8 bg-white space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#34A853]">
          <ShieldCheck className="w-5 h-5" />
          <span>Verified Non-Profit Partner</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">Clean Air Foundation India</h1>
        <p className="text-xs text-[#5F6368] leading-relaxed">
          Pioneering community-scale air scrubbing technologies, rooftop solar filters for government schools, and biodiverse urban afforestation in high pollution density corridors across northern India.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED] text-xs">
          <div>
            <span className="text-[10px] text-[#80868B] uppercase font-bold">Registration</span>
            <span className="font-bold text-[#202124] block mt-0.5">NGO-IND-80G-4921</span>
          </div>
          <div>
            <span className="text-[10px] text-[#80868B] uppercase font-bold">Total Capital Audited</span>
            <span className="font-bold text-[#34A853] block mt-0.5">₹84,50,000</span>
          </div>
          <div>
            <span className="text-[10px] text-[#80868B] uppercase font-bold">Beneficiary Scope</span>
            <span className="font-bold text-[#1967D2] block mt-0.5">24,000+ Citizens</span>
          </div>
        </div>
      </div>
    </div>
  );
}
