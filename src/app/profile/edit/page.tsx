'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGamification } from '@/lib/gamification-context';
import { ArrowLeft, User, MapPin, Save } from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  const { player, updatePlayerProfile, addToast } = useGamification();
  const [name, setName] = useState(player.name);
  const [username, setUsername] = useState(player.handle?.replace('@', '') || 'guardian');
  const [zone, setZone] = useState(player.assignedZone || 'Zone 04 - Dwarka Greens');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updatePlayerProfile({
        name,
        assignedZone: zone,
      });
      router.push('/profile');
    } catch {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-[#5F6368] hover:text-[#202124] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Profile</span>
      </button>

      <div className="gdg-card p-6 md:p-8 bg-white space-y-6">
        <h1 className="text-2xl font-black text-[#202124] tracking-tight">Edit Guardian Profile</h1>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">Primary Zone</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none"
            >
              <option>Zone 01 - Connaught & Central Hub</option>
              <option>Zone 02 - Okhla Industrial Belt</option>
              <option>Zone 03 - Rohini Eco Zone</option>
              <option>Zone 04 - Dwarka Greens</option>
              <option>Zone 05 - Noida Tech Corridor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-4"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
}
