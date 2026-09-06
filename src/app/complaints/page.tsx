'use client';

import React, { useState } from 'react';
import { useGamification } from '@/lib/gamification-context';
import { mockComplaints } from '@/lib/mock-data';
import { Complaint } from '@/types';
import {
  AlertCircle,
  PlusCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Shield,
  Zap,
  X,
  Send,
  Building,
  UserCheck,
} from 'lucide-react';

import { complaintsApi } from '@/lib/api/complaints';

export default function ComplaintsPage() {
  const { addToast } = useGamification();
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Complaint['category']>('Garbage Burning');
  const [severity, setSeverity] = useState<Complaint['severity']>('HIGH');
  const [zone, setZone] = useState('Zone 04 - Dwarka Greens');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const loadComplaints = React.useCallback(async () => {
    try {
      const liveComplaints = await complaintsApi.getAllComplaints();
      if (liveComplaints && liveComplaints.length > 0) {
        setComplaints(liveComplaints as any);
      }
    } catch (err) {
      console.warn('Could not load complaints:', err);
    }
  }, []);

  React.useEffect(() => {
    loadComplaints();
  }, [loadComplaints]);

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'Resolved':
        return 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]';
      case 'Action Dispatched':
        return 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC]';
      case 'Under Investigation':
        return 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]';
      default:
        return 'bg-[#F8FAFD] text-[#5F6368] border-[#E8EAED]';
    }
  };

  const getSeverityBadge = (sev: Complaint['severity']) => {
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

  const handleFileComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    try {
      const res = await complaintsApi.fileComplaint({
        title,
        category,
        severity,
        zone,
        location,
        description,
        photoFile: photoFile || undefined,
      });
      await loadComplaints();
      addToast({
        title: '📋 Complaint Filed Successfully',
        description: `Ticket ${res?.ticketNumber || 'AIR-2026'} registered. Saved to MongoDB!`,
        type: 'success',
        xpReward: 50,
      });
    } catch (err: any) {
      // optimistic local fallback
      const newTicket: Complaint = {
        id: `cmp_${Date.now()}`,
        ticketNumber: `AG-CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        title,
        category,
        severity,
        zone,
        location,
        description,
        status: 'Submitted',
        timestamp: 'Just now',
        xpAwarded: 100,
        assignedOfficer: 'Municipal Taskforce Dispatch Desk (Automated Triage)',
      };
      setComplaints([newTicket, ...complaints]);
      addToast({
        title: '📋 Complaint Filed',
        description: `Ticket ${newTicket.ticketNumber} registered. +50 XP submission bonus!`,
        type: 'success',
        xpReward: 50,
      });
    }

    setShowModal(false);
    setTitle('');
    setLocation('');
    setDescription('');
    setPhotoFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FCE8E6] text-[#C5221F] text-[11px] font-bold border border-[#FAD2CF]">
              Citizen Grievance & Enforcement Hub
            </span>
            <span className="text-xs text-[#5F6368] font-medium">
              Direct Municipal Taskforce Escalation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
            File Pollution Grievances
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-1">
            Report illegal garbage burning, dust violations, or industrial emissions. Track municipal officer investigations in real time and earn XP when resolved.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#EA4335] hover:bg-[#D93025] text-white font-bold text-xs shadow-md transition-all active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ File New Complaint</span>
        </button>
      </div>

      {/* Main Grid: Complaints List & Details Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Complaints Listing Table */}
        <div className="lg:col-span-8 gdg-card bg-white overflow-x-auto">
          <div className="p-4 border-b border-[#F1F3F4] flex items-center justify-between">
            <span className="text-xs font-bold text-[#202124] uppercase tracking-wider">
              My Active Grievance Tickets ({complaints.length})
            </span>
            <span className="text-[11px] text-[#80868B]">Click any ticket to track timeline</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-[#E8EAED] text-[#5F6368] uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Ticket & Incident</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Severity</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-[#5F6368]">
                    <div className="w-10 h-10 rounded-full bg-[#FCE8E6] text-[#EA4335] flex items-center justify-center mx-auto mb-2">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-[#202124] block">No complaints filed yet</span>
                    <span className="text-[11px] text-[#80868B]">Click &ldquo;+ File New Complaint&rdquo; above to report pollution in your zone.</span>
                  </td>
                </tr>
              ) : (
                complaints.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedComplaint(c)}
                    className={`cursor-pointer transition-colors ${
                      selectedComplaint?.id === c.id ? 'bg-[#E8F0FE]/40' : 'hover:bg-[#F8FAFD]'
                    }`}
                  >
                    <td className="py-3.5 px-6">
                      <span className="font-mono text-[11px] font-bold text-[#4285F4] block">
                        {c.ticketNumber}
                      </span>
                      <span className="font-bold text-[#202124] block mt-0.5 line-clamp-1">{c.title}</span>
                      <span className="text-[10px] text-[#80868B] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#EA4335]" />
                        {c.location}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-[#5F6368]">{c.category}</td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge(c.severity)}`}>
                        {c.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right font-bold text-[#4285F4]">
                      Inspect →
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Complaint Timeline & Investigation Card */}
        <div className="lg:col-span-4">
          {selectedComplaint ? (
            <div className="gdg-card p-6 bg-white space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F4]">
                <div>
                  <span className="text-[10px] font-bold text-[#80868B] uppercase">Grievance Ticket</span>
                  <span className="font-mono text-xs font-bold text-[#4285F4] block">
                    {selectedComplaint.ticketNumber}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(selectedComplaint.status)}`}>
                  {selectedComplaint.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#202124] leading-snug">
                  {selectedComplaint.title}
                </h3>
                <span className="text-[11px] text-[#80868B] mt-0.5 block">
                  Reported {selectedComplaint.timestamp} • {selectedComplaint.zone}
                </span>
              </div>

              {selectedComplaint.imageUrl && (
                <div className="rounded-2xl overflow-hidden border border-[#E8EAED] max-h-48">
                  <img
                    src={selectedComplaint.imageUrl}
                    alt="Complaint Proof"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-[#5F6368] leading-relaxed">
                {selectedComplaint.description}
              </p>

              {/* Municipal Action Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#202124] font-bold">
                  <UserCheck className="w-4 h-4 text-[#34A853]" />
                  <span>Assigned Officer</span>
                </div>
                <p className="text-[11px] text-[#5F6368]">
                  {selectedComplaint.assignedOfficer || 'Municipal Environmental Cell'}
                </p>

                {selectedComplaint.resolutionNotes && (
                  <div className="pt-2 border-t border-[#E8EAED]">
                    <span className="font-bold text-[#137333] block text-[11px]">Resolution Action:</span>
                    <p className="text-[11px] text-[#5F6368] mt-0.5 leading-relaxed">
                      {selectedComplaint.resolutionNotes}
                    </p>
                  </div>
                )}
              </div>

              {/* XP Reward for Filing */}
              <div className="p-3 rounded-2xl bg-[#E8F0FE] border border-[#D2E3FC] flex items-center justify-between text-xs font-bold text-[#1967D2]">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-[#4285F4]" />
                  <span>Resolution Reward</span>
                </span>
                <span>+{selectedComplaint.xpAwarded} XP</span>
              </div>
            </div>
          ) : (
            <div className="gdg-card p-8 bg-white text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-[#80868B] mx-auto" />
              <span className="text-xs font-bold text-[#202124] block">
                Select a grievance ticket
              </span>
              <p className="text-[11px] text-[#5F6368]">
                Click on any complaint in the list to view its real-time municipal inspection timeline.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* File Complaint Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-[#E8EAED] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F4]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#EA4335]" />
                <h3 className="text-base font-bold text-[#202124]">File Environmental Grievance</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#80868B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFileComplaint} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-[#202124] block mb-1">
                  Incident Title / Brief Summary
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Open burning of plastic waste behind market"
                  className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#202124] block mb-1">Violation Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full h-11 px-3 text-xs bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
                  >
                    <option>Garbage Burning</option>
                    <option>Construction Dust</option>
                    <option>Industrial Smoke</option>
                    <option>Traffic Idling</option>
                    <option>Roadside Waste</option>
                    <option>Tree Cutting</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#202124] block mb-1">Severity Level</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full h-11 px-3 text-xs bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
                  >
                    <option value="CRITICAL">Critical (Immediate Hazard)</option>
                    <option value="HIGH">High (Continuous Smoke)</option>
                    <option value="MODERATE">Moderate (Intermittent Dust)</option>
                    <option value="LOW">Low (Minor Odor/Litter)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#202124] block mb-1">Environmental Zone</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full h-11 px-3 text-xs bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
                  >
                    <option>Zone 01 - Connaught & Central Hub</option>
                    <option>Zone 02 - Okhla Industrial Belt</option>
                    <option>Zone 03 - Rohini Eco Zone</option>
                    <option>Zone 04 - Dwarka Greens</option>
                    <option>Zone 05 - Noida Tech Corridor</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#202124] block mb-1">Exact Landmark / Street</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Near Metro Pillar 142"
                    className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#202124] block mb-1">Description & Timing</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details on smoke color, timing, responsible entity if known..."
                  className="w-full p-3 text-xs bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="p-4 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-colors block bg-[#F8FAFD] border-[#DADCE0] text-[#5F6368] hover:border-[#4285F4]">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setPhotoFile(e.target.files[0]);
                    }}
                  />
                  <Camera className="w-6 h-6 mx-auto mb-1 text-[#4285F4]" />
                  <span className="text-xs font-bold block">
                    {photoFile ? `✓ File Selected: ${photoFile.name}` : 'Attach Photo Evidence (Click to browse)'}
                  </span>
                  <span className="text-[10px] block opacity-80 mt-0.5">
                    Uploaded directly to Cloudinary & verified by municipal AI
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-[#1967D2] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-[#4285F4]" />
                  <span>+100 XP upon municipal resolution</span>
                </span>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#EA4335] hover:bg-[#D93025] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Taskforce</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
