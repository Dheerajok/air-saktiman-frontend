'use client';

import React from 'react';
import { mockEvents } from '@/lib/mock-data';
import { Calendar, Plus, Users, Zap } from 'lucide-react';

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">Event & Rally Scheduling</h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Organize mass tree plantation drives, community anti-smog rallies, and regional challenges.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md">
          <Plus className="w-4 h-4" />
          <span>+ Schedule Drive</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockEvents.map((evt) => (
          <div key={evt.id} className="gdg-card p-6 bg-white space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#34A853]">{evt.category}</span>
              <span className="font-black text-[#1967D2]">+{evt.xpReward} XP</span>
            </div>
            <h3 className="text-base font-bold text-[#202124]">{evt.title}</h3>
            <p className="text-xs text-[#5F6368]">{evt.location} • {evt.date}</p>
            <div className="pt-2 border-t border-[#F1F3F4] text-xs text-[#5F6368] flex items-center justify-between">
              <span>{evt.participantsCount} Guardians Registered</span>
              <button className="text-xs font-bold text-[#4285F4] hover:underline">Manage Roster →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
