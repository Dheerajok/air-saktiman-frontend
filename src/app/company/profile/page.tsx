'use client';

import React from 'react';
import { mockCompany } from '@/lib/mock-data';
import { Building2, MapPin, Globe, Mail, ShieldCheck, Award, Leaf } from 'lucide-react';

export default function CompanyProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white space-y-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-[#E6F4EA] border border-[#CEEAD6] flex items-center justify-center text-4xl shadow-sm">
            {mockCompany.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#202124]">{mockCompany.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-bold text-xs">
                Verified CSR Partner
              </span>
            </div>
            <p className="text-xs text-[#5F6368] mt-1">{mockCompany.industry}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] text-xs">
          <div>
            <span className="text-[10px] text-[#80868B] uppercase font-bold">HQ Location</span>
            <span className="font-bold text-[#202124] block mt-0.5">{mockCompany.location}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#80868B] uppercase font-bold">Annual CSR Budget</span>
            <span className="font-bold text-[#34A853] block mt-0.5">{mockCompany.totalCsrFunding}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#80868B] uppercase font-bold">Enrolled Workforce</span>
            <span className="font-bold text-[#202124] block mt-0.5">{mockCompany.employeesCount} Employees</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#202124]">Corporate ESG Charter</h3>
          <p className="text-xs text-[#5F6368] leading-relaxed">
            Committed to accelerating urban clean air solutions, reducing scope 3 emissions through employee transit incentives, and directing CSR capital to high-impact Miyawaki bio-lungs and public school air filtration.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-[#202124]">CSR Focus Pillars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: 'Air Filtration in Schools', icon: Leaf, color: 'text-[#34A853]' },
              { title: 'Urban Miyawaki Forests', icon: Award, color: 'text-[#4285F4]' },
              { title: 'Farmer Stubble Incentive', icon: ShieldCheck, color: 'text-[#FBBC05]' },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${p.color}`} />
                  <span className="text-xs font-bold text-[#202124]">{p.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
