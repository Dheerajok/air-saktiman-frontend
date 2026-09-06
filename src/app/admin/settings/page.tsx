'use client';

import React from 'react';
import { useGamification } from '@/lib/gamification-context';
import { Settings, Save, ShieldCheck, Database, Bell, Radio } from 'lucide-react';

export default function AdminSettingsPage() {
  const { addToast } = useGamification();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Settings Saved',
      description: 'System configuration parameters updated successfully.',
      type: 'success',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">Platform & Sensor Settings</h1>
        <p className="text-xs text-[#5F6368]">
          Configure API endpoints, threshold alerts, AI inference parameters, and gamification multipliers.
        </p>
      </div>

      <div className="gdg-card p-6 md:p-8 bg-white space-y-6">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <h3 className="text-sm font-bold text-[#202124] mb-3">Air Quality Thresholds</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#5F6368] block mb-1">
                  Hazardous AQI Emergency Trigger
                </label>
                <input
                  type="number"
                  defaultValue={200}
                  className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#5F6368] block mb-1">
                  Citizen Mission XP Multiplier (Peak Window)
                </label>
                <input
                  type="text"
                  defaultValue="2.0x"
                  className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F1F3F4]">
            <h3 className="text-sm font-bold text-[#202124] mb-3">AI Decision Model Calibration</h3>
            <div className="space-y-3 text-xs text-[#5F6368]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#4285F4]" />
                <span className="font-semibold text-[#202124]">
                  Require double human sign-off for municipal alerts
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#4285F4]" />
                <span className="font-semibold text-[#202124]">
                  Auto-publish low-severity community awareness quests
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </form>
      </div>
    </div>
  );
}
