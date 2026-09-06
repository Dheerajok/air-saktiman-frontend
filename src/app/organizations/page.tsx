'use client';

import React from 'react';
import Link from 'next/link';
import { Globe2, ShieldCheck, CheckCircle2, Trees, ArrowRight } from 'lucide-react';

export default function OrganizationsPage() {
  const orgs = [
    {
      id: 'org_1',
      name: 'Clean Air Foundation India',
      mission: 'Urban air purification, low-cost sensor network deployment, and micro-forest cultivation.',
      location: 'New Delhi & NCR',
      verified: true,
      activeProjects: 4,
      fundingReceived: '₹84,50,000',
      impactScore: 9400,
    },
    {
      id: 'org_2',
      name: 'Sankalp Taru Climate Initiative',
      mission: 'Geotagged community afforestation and farmer livelihood support through native fruit trees.',
      location: 'Pan-India Eco Zones',
      verified: true,
      activeProjects: 6,
      fundingReceived: '₹1,20,00,000',
      impactScore: 14200,
    },
    {
      id: 'org_3',
      name: 'Prana Air Alliance',
      mission: 'School clean air sanctuary installations and vulnerable children health monitoring.',
      location: 'Ghaziabad & Noida',
      verified: true,
      activeProjects: 3,
      fundingReceived: '₹48,00,000',
      impactScore: 6800,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white space-y-2">
        <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-xs">
          Audited NGO Partners
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">
          Verified Environmental Organizations
        </h1>
        <p className="text-xs text-[#5F6368]">
          Discover certified climate foundations with transparent impact audits and live satellite tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {orgs.map((org) => (
          <div key={org.id} className="gdg-card p-6 bg-white flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#34A853] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified 80G Certified NGO</span>
              </div>
              <h3 className="text-base font-bold text-[#202124]">{org.name}</h3>
              <p className="text-xs text-[#5F6368] mt-1.5 leading-relaxed">{org.mission}</p>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#F1F3F4] text-xs text-[#5F6368]">
                <div>
                  <span className="text-[10px] text-[#80868B] block">Projects</span>
                  <strong className="text-[#202124]">{org.activeProjects} Active</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#80868B] block">Impact Rank</span>
                  <strong className="text-[#34A853]">{org.impactScore} Pts</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F3F4]">
              <Link
                href={`/organizations/${org.id}`}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFD] hover:bg-[#E8F0FE] text-[#1967D2] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Audited Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
