'use client';

import React, { useState } from 'react';
import { useGamification } from '@/lib/gamification-context';
import { ClipboardList, Plus, Image as ImageIcon, Zap, Shield, MapPin, CheckCircle2 } from 'lucide-react';

export default function AdminTasksManagerPage() {
  const { addToast } = useGamification();
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('Community Reporting');
  const [location, setLocation] = useState('Zone 02 - Okhla');
  const [xpReward, setXpReward] = useState('200');
  const [impactScore, setImpactScore] = useState('40');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [instructions, setInstructions] = useState('Capture clear geo-tagged photo showing emission source.');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    addToast({
      title: '🎯 Task Created & Published',
      description: `New mission "${taskName}" is now live for all Guardians in ${location}.`,
      type: 'success',
    });

    setTaskName('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white space-y-2">
        <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-bold text-xs">
          Quest & Task Authoring System
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">
          Image-Verified Task Management
        </h1>
        <p className="text-xs text-[#5F6368]">
          Create environmental tasks requiring photo evidence and GPS coordinate verification.
        </p>
      </div>

      <div className="gdg-card p-6 md:p-8 bg-white space-y-6">
        <h2 className="text-base font-bold text-[#202124]">Create New Citizen Quest</h2>

        <form onSubmit={handleCreateTask} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#202124] block mb-1">Task Title</label>
              <input
                type="text"
                required
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="e.g. Identify Illegal Garbage Burning"
                className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#202124] block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
              >
                <option>Air Cleaning</option>
                <option>Tree Plantation</option>
                <option>Waste Management</option>
                <option>Community Reporting</option>
                <option>Climate Resilience</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#202124] block mb-1">XP Reward</label>
              <input
                type="number"
                value={xpReward}
                onChange={(e) => setXpReward(e.target.value)}
                className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#202124] block mb-1">Impact Points</label>
              <input
                type="number"
                value={impactScore}
                onChange={(e) => setImpactScore(e.target.value)}
                className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#202124] block mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full h-11 px-4 text-xs font-medium bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
              >
                <option>EASY</option>
                <option>MEDIUM</option>
                <option>HARD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#202124] block mb-1">
              Instructions for Citizen Photo Evidence
            </label>
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 text-xs bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Mission to Citizen Feed</span>
          </button>
        </form>
      </div>
    </div>
  );
}
