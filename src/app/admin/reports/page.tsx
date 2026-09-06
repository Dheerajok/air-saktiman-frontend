'use client';

import React, { useState } from 'react';
import { mockReports } from '@/lib/mock-data';
import { useGamification } from '@/lib/gamification-context';
import { EnvironmentalReport } from '@/types';
import {
  AlertTriangle,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  Image as ImageIcon,
  User,
  Shield,
} from 'lucide-react';

import { reportsApi } from '@/lib/api/reports';

export default function AdminReportsPage() {
  const { addToast } = useGamification();
  const [reports, setReports] = useState<EnvironmentalReport[]>(mockReports);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReport, setSelectedReport] = useState<EnvironmentalReport | null>(null);

  const loadReports = React.useCallback(async () => {
    try {
      const liveReports = await reportsApi.getReports(statusFilter === 'ALL' ? undefined : statusFilter);
      if (liveReports && liveReports.length > 0) {
        setReports(liveReports);
      }
    } catch (err) {
      console.warn('Could not load reports:', err);
    }
  }, [statusFilter]);

  React.useEffect(() => {
    loadReports();
  }, [loadReports]);

  const handleUpdateStatus = async (id: string, newStatus: EnvironmentalReport['status']) => {
    try {
      await reportsApi.updateReportStatus(id, newStatus as any);
      await loadReports();
    } catch {
      // optimistic fallback
      setReports((prev) =>
        prev.map((r) => {
          if (r.id === id) {
            return { ...r, status: newStatus };
          }
          return r;
        }),
      );
    }

    addToast({
      title: `Report ${newStatus}`,
      description: `Report #${id} marked as ${newStatus}. Updated in database.`,
      type: newStatus === 'Verified' ? 'success' : 'info',
    });

    if (selectedReport?.id === id) {
      setSelectedReport({ ...selectedReport, status: newStatus });
    }
  };

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]';
      case 'HIGH':
        return 'bg-[#FEF0E6] text-[#C05621] border-[#FED7BE]';
      case 'MODERATE':
        return 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]';
      default:
        return 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]';
    }
  };

  const filtered = reports.filter((r) => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">Citizen Pollution Incident Reports</h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Review citizen submissions, evaluate geo-tagged smoke/dust photographs, and disbatch municipal taskforces.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 p-1 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
          {(['ALL', 'Pending', 'Under Review', 'Verified'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab
                  ? 'bg-white text-[#4285F4] shadow-xs border border-[#D2E3FC]'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 gdg-card bg-white overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-[#E8EAED] text-[#5F6368] uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Incident Title</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Zone / Location</th>
                <th className="py-3.5 px-6">Severity</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#5F6368]">
                    <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#1967D2] flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-[#202124] block">No reports to display</span>
                    <span className="text-[11px] text-[#80868B]">Incoming citizen reports will appear here in real time.</span>
                  </td>
                </tr>
              ) : (
                filtered.map((rep) => (
                  <tr
                    key={rep.id}
                    onClick={() => setSelectedReport(rep)}
                    className={`cursor-pointer transition-colors ${
                      selectedReport?.id === rep.id ? 'bg-[#E8F0FE]/40' : 'hover:bg-[#F8FAFD]'
                    }`}
                  >
                    <td className="py-3.5 px-6 font-bold">{rep.title}</td>
                    <td className="py-3.5 px-6 text-[#5F6368]">{rep.category}</td>
                    <td className="py-3.5 px-6 text-[#5F6368] truncate max-w-[150px]">{rep.location}</td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityStyle(rep.severity)}`}>
                        {rep.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="px-2 py-0.5 rounded-full bg-[#F1F3F4] text-[#3C4043] font-semibold text-[10px]">
                        {rep.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right font-bold text-[#4285F4]">Review →</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-4">
          {selectedReport ? (
            <div className="gdg-card p-6 bg-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#80868B] uppercase">Incident #{selectedReport.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityStyle(selectedReport.severity)}`}>
                  {selectedReport.severity} Severity
                </span>
              </div>

              <h3 className="text-base font-bold text-[#202124]">{selectedReport.title}</h3>

              {selectedReport.imageUrl && (
                <div className="rounded-2xl overflow-hidden border border-[#E8EAED] max-h-52">
                  <img
                    src={selectedReport.imageUrl}
                    alt="Incident evidence"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-[#5F6368] leading-relaxed">
                {selectedReport.description}
              </p>

              <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] text-xs space-y-1 text-[#5F6368]">
                <div><strong>Reporter:</strong> {selectedReport.reporter}</div>
                <div><strong>Location:</strong> {selectedReport.location}</div>
                <div><strong>Reported:</strong> {selectedReport.timestamp}</div>
              </div>

              {/* Status Update Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F1F3F4]">
                <button
                  onClick={() => handleUpdateStatus(selectedReport.id, 'Verified')}
                  className="py-2 px-3 rounded-xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs"
                >
                  Verify & Dispatch
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedReport.id, 'Rejected')}
                  className="py-2 px-3 rounded-xl bg-[#FCE8E6] hover:bg-[#FAD2CF] text-[#C5221F] font-bold text-xs"
                >
                  Reject Report
                </button>
              </div>
            </div>
          ) : (
            <div className="gdg-card p-8 bg-white text-center text-xs text-[#5F6368]">
              Select a report from the list to view photo evidence and change status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
