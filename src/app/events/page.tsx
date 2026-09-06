'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from '@/lib/gamification-context';
import { mockEvents } from '@/lib/mock-data';
import { EventItem } from '@/types';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Zap,
  ArrowRight,
  Shield,
  CheckCircle2,
  Plus,
} from 'lucide-react';

export default function EventsPage() {
  const { addToast, awardPlayerXpAndImpact } = useGamification();
  const [eventsList, setEventsList] = useState<EventItem[]>(mockEvents);
  const [activeFilter, setActiveFilter] = useState<'Upcoming' | 'Nearby' | 'Joined'>('Upcoming');

  const handleToggleJoin = (id: string) => {
    setEventsList((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const isJoined = !e.isJoined;
          if (isJoined) {
            awardPlayerXpAndImpact(50, 10);
          }
          addToast({
            title: isJoined ? '🎉 Event Joined!' : 'Registration Cancelled',
            description: isJoined
              ? `You are registered for "${e.title}". +50 XP bonus added!`
              : `Removed registration for "${e.title}".`,
            type: isJoined ? 'success' : 'info',
            xpReward: isJoined ? 50 : undefined,
          });
          return {
            ...e,
            isJoined,
            participantsCount: isJoined ? e.participantsCount + 1 : e.participantsCount - 1,
          };
        }
        return e;
      }),
    );
  };

  const filteredEvents = eventsList.filter((e) => {
    if (activeFilter === 'Joined' && !e.isJoined) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gdg-card p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-[11px] font-bold">
            Community Drives & Rallies
          </span>
          <h1 className="text-2xl font-black text-[#202124] tracking-tight mt-1">
            Clean Air Community Events
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-0.5">
            Join mass tree plantation rallies, anti-smog marathons, and environmental hackathons.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
          {(['Upcoming', 'Nearby', 'Joined'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab
                  ? 'bg-white text-[#4285F4] shadow-xs border border-[#D2E3FC]'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="gdg-card p-6 bg-white flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-[10px] border border-[#CEEAD6]">
                  {event.category}
                </span>

                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F0FE] text-[#1967D2] font-black text-xs">
                  <Zap className="w-3.5 h-3.5 fill-[#4285F4]" />
                  +{event.xpReward} XP
                </span>
              </div>

              <Link href={`/events/${event.id}`}>
                <h3 className="text-lg font-bold text-[#202124] hover:text-[#4285F4] transition-colors leading-snug">
                  {event.title}
                </h3>
              </Link>
              <p className="text-xs font-semibold text-[#34A853] mt-0.5">{event.tagline}</p>

              <p className="text-xs text-[#5F6368] mt-2 line-clamp-2 leading-relaxed">
                {event.description}
              </p>

              {/* Event Meta Details */}
              <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] text-xs text-[#5F6368] mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#4285F4] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#80868B] block">Date</span>
                    <span className="font-bold text-[#202124] text-[11px] truncate block">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FBBC05] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#80868B] block">Time</span>
                    <span className="font-bold text-[#202124] text-[11px] truncate block">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#EA4335] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#80868B] block">Location</span>
                    <span className="font-bold text-[#202124] text-[11px] truncate block">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#34A853] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#80868B] block">Impact Level</span>
                    <span className="font-bold text-[#202124] text-[11px]">{event.impactLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-[#F1F3F4]">
              <div className="flex items-center gap-1.5 text-xs text-[#5F6368] font-medium">
                <Users className="w-4 h-4 text-[#4285F4]" />
                <span>
                  <strong>{event.participantsCount}</strong> / {event.maxParticipants} spots
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/events/${event.id}`}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-[#5F6368] hover:bg-[#F8FAFD]"
                >
                  Details
                </Link>

                <button
                  onClick={() => handleToggleJoin(event.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-all active:scale-95 ${
                    event.isJoined
                      ? 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]'
                      : 'bg-[#4285F4] hover:bg-[#3367D6] text-white'
                  }`}
                >
                  {event.isJoined ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Joined</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Join Event</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
