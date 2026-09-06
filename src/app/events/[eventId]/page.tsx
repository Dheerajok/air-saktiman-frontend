'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockEvents } from '@/lib/mock-data';
import { useGamification } from '@/lib/gamification-context';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Shield,
  Zap,
  CheckCircle2,
  Share2,
  Navigation,
} from 'lucide-react';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useGamification();
  const eventId = params?.eventId as string;

  const event = mockEvents.find((e) => e.id === eventId) || mockEvents[0];
  const [isJoined, setIsJoined] = useState(event.isJoined);

  const handleToggle = () => {
    const nextState = !isJoined;
    setIsJoined(nextState);
    addToast({
      title: nextState ? '🎉 Event Confirmed' : 'Registration Cancelled',
      description: nextState ? `You are registered for "${event.title}"` : 'Registration removed.',
      type: nextState ? 'success' : 'info',
      xpReward: nextState ? 50 : undefined,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-[#5F6368] hover:text-[#202124] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events Listing</span>
      </button>

      <div className="gdg-card p-6 md:p-8 bg-white space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-xs">
            {event.category}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1967D2] font-black text-xs">
            <Zap className="w-4 h-4 fill-[#4285F4]" />
            +{event.xpReward} XP for Joining
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
            {event.title}
          </h1>
          <p className="text-sm font-semibold text-[#34A853] mt-1">{event.tagline}</p>
        </div>

        <p className="text-sm text-[#5F6368] leading-relaxed">
          {event.description}
        </p>

        {/* Organizer & Location Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] text-xs">
          <div>
            <span className="text-[10px] text-[#80868B] block uppercase font-bold">Organizer</span>
            <span className="font-bold text-[#202124] block mt-0.5">{event.organizer}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#80868B] block uppercase font-bold">Time & Date</span>
            <span className="font-bold text-[#202124] block mt-0.5">{event.date} • {event.time}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#80868B] block uppercase font-bold">Location</span>
            <span className="font-bold text-[#202124] block mt-0.5">{event.location} ({event.city})</span>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="rounded-2xl border border-[#E8EAED] p-6 bg-[#F8FAFD] text-center space-y-2">
          <Navigation className="w-8 h-8 text-[#4285F4] mx-auto" />
          <span className="text-xs font-bold text-[#202124] block">
            Meeting Point: {event.location}
          </span>
          <span className="text-[11px] text-[#5F6368] block">
            GPS Coordinates: 28.5933° N, 77.2197° E • Zone 01 Dispatch Point
          </span>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F1F3F4]">
          <span className="text-xs font-bold text-[#5F6368]">
            <strong>{event.participantsCount}</strong> registered guardians
          </span>

          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all active:scale-95 ${
              isJoined
                ? 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]'
                : 'bg-[#4285F4] hover:bg-[#3367D6] text-white'
            }`}
          >
            {isJoined ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>You are Registered</span>
              </>
            ) : (
              <span>Register for Free (+{event.xpReward} XP)</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
