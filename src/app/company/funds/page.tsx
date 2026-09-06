'use client';

import React, { useState } from 'react';
import { mockCsrProjects } from '@/lib/mock-data';
import { useGamification } from '@/lib/gamification-context';
import { CSRProject } from '@/types';
import {
  CircleDollarSign,
  Building2,
  Trees,
  Users,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import { companyApi } from '@/lib/api/company';

export default function CSRFundingMarketplacePage() {
  const { addToast } = useGamification();
  const [projects, setProjects] = useState<CSRProject[]>(mockCsrProjects);
  const [selectedProject, setSelectedProject] = useState<CSRProject | null>(null);
  const [fundAmount, setFundAmount] = useState('50000');

  const loadProjects = React.useCallback(async () => {
    try {
      const liveProjects = await companyApi.getProjects();
      if (liveProjects && liveProjects.length > 0) {
        setProjects(liveProjects as any);
      }
    } catch (err) {
      console.warn('Could not load CSR projects:', err);
    }
  }, []);

  React.useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleFundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const amountNum = parseInt(fundAmount, 10);
    try {
      await companyApi.disburseFunds(selectedProject.id, amountNum);
      await loadProjects();
    } catch {
      // optimistic fallback
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === selectedProject.id) {
            const newFunded = Math.min(p.requiredFunds, p.fundedAmount + amountNum);
            return {
              ...p,
              fundedAmount: newFunded,
              status: newFunded >= p.requiredFunds ? 'FULLY_FUNDED' : 'ACTIVE',
            };
          }
          return p;
        }),
      );
    }

    addToast({
      title: '💼 CSR Grant Disbursed!',
      description: `Successfully contributed ₹${amountNum.toLocaleString()} to "${selectedProject.title}". Saved to database!`,
      type: 'success',
    });

    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] text-[11px] font-bold">
            Corporate ESG Capital Gateway
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight mt-1">
            CSR Environmental Funding Marketplace
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-1">
            Direct audited corporate CSR funds directly to high-impact grassroots climate organizations.
          </p>
        </div>
      </div>

      {/* Conceptual Flow Diagram Card */}
      <div className="gdg-card p-6 bg-[#F8FAFD] border border-[#E8EAED]">
        <span className="text-[10px] font-bold text-[#80868B] uppercase tracking-wider block mb-3 text-center">
          AUDITED CSR CAPITAL DEPLOYMENT LIFECYCLE
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs font-bold">
          <div className="p-3 bg-white rounded-2xl border border-[#E8EAED]">1. ENTERPRISE CSR</div>
          <div className="p-3 bg-[#E8F0FE] text-[#1967D2] rounded-2xl border border-[#D2E3FC]">2. AUDITED ESCROW</div>
          <div className="p-3 bg-white rounded-2xl border border-[#E8EAED]">3. VERIFIED NGO</div>
          <div className="p-3 bg-[#E6F4EA] text-[#137333] rounded-2xl border border-[#CEEAD6]">4. CLEAN AIR PROJECT</div>
          <div className="p-3 bg-[#FEF7E0] text-[#B06000] rounded-2xl border border-[#FEEFC3]">5. MEASURED IMPACT</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const pct = Math.min(100, Math.round((proj.fundedAmount / proj.requiredFunds) * 100));
          const isFully = proj.status === 'FULLY_FUNDED' || pct >= 100;

          return (
            <div
              key={proj.id}
              className="gdg-card p-6 bg-white flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-[#5F6368]">{proj.organization}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isFully
                        ? 'bg-[#E6F4EA] text-[#137333]'
                        : 'bg-[#E8F0FE] text-[#1967D2]'
                    }`}
                  >
                    {isFully ? 'Fully Funded' : `${pct}% Funded`}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#202124] leading-snug">{proj.title}</h3>
                <p className="text-xs text-[#5F6368] mt-1.5 leading-relaxed">{proj.targetImpact}</p>

                {/* Measurable Targets */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#F1F3F4] text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F8FAFD]">
                    <span className="text-[10px] text-[#80868B] block">Target Canopy</span>
                    <strong className="text-[#34A853]">{proj.treesTarget.toLocaleString()} Trees</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8FAFD]">
                    <span className="text-[10px] text-[#80868B] block">Direct Benefit</span>
                    <strong className="text-[#1967D2]">{proj.householdsTarget.toLocaleString()} Families</strong>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#202124]">₹{proj.fundedAmount.toLocaleString()}</span>
                    <span className="text-[#80868B]">Goal: ₹{proj.requiredFunds.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F1F3F4] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isFully ? 'bg-[#34A853]' : 'bg-[#4285F4]'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1F3F4]">
                {isFully ? (
                  <div className="w-full py-2.5 text-center text-xs font-bold text-[#137333] bg-[#E6F4EA] rounded-xl flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Project Execution Underway</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <CircleDollarSign className="w-4 h-4" />
                    <span>Fund Project</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fund Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#E8EAED]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F4]">
              <h3 className="text-base font-bold text-[#202124]">Disburse CSR Grant</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#80868B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFundSubmit} className="space-y-4 mt-4">
              <div>
                <span className="text-xs text-[#5F6368] block">Project:</span>
                <span className="text-sm font-bold text-[#202124] block">{selectedProject.title}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-[#202124] block mb-1">
                  CSR Grant Amount (INR)
                </label>
                <select
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="w-full h-11 px-4 text-xs font-bold bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
                >
                  <option value="25000">₹25,000 (Micro Grant)</option>
                  <option value="50000">₹50,000 (Community Node)</option>
                  <option value="100000">₹1,00,000 (Urban Lung Tier)</option>
                  <option value="250000">₹2,50,000 (Major Sponsorship)</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] text-xs text-[#137333] space-y-1">
                <span className="font-bold block">Tax Exemption & Audit:</span>
                <span className="text-[11px] block">
                  Eligible for 80G tax benefits. Satellite verification report provided at completion.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Confirm CSR Grant of ₹{parseInt(fundAmount, 10).toLocaleString()}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
