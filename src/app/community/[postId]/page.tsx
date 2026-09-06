'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockCommunityPosts } from '@/lib/mock-data';
import { useGamification } from '@/lib/gamification-context';
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
  Send,
  MapPin,
  Zap,
  Shield,
} from 'lucide-react';

export default function CommunityPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { player, addToast } = useGamification();
  const postId = params?.postId as string;

  const post = mockCommunityPosts.find((p) => p.id === postId) || mockCommunityPosts[0];
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'Sunita Reddy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      time: '20 mins ago',
      text: 'Inspiring work! We noticed a clear dip in airborne dust levels on the neighborhood monitor right after your watering run.',
    },
    {
      id: 'c2',
      author: 'Vikramaditya Das',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      time: '1 hour ago',
      text: 'Kudos! Linking this to the Zone 04 community quest log for additional bonus multipliers.',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        id: `c_${Date.now()}`,
        author: player.name,
        avatar: player.avatar,
        time: 'Just now',
        text: newComment,
      },
    ]);
    setNewComment('');
    addToast({
      title: 'Comment Added',
      description: '+10 XP for community discussion participation.',
      type: 'success',
      xpReward: 10,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-[#5F6368] hover:text-[#202124] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Community Feed</span>
      </button>

      {/* Main Post Card */}
      <div className="gdg-card p-6 bg-white space-y-5">
        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover border border-[#E8EAED]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#202124]">{post.author.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-black text-xs">
                L{post.author.level}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5F6368] mt-0.5">
              <span>{post.author.rank}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                {post.author.location}
              </span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-[#202124] leading-relaxed font-normal">
          {post.content}
        </p>

        {post.image && (
          <div className="rounded-2xl overflow-hidden border border-[#E8EAED]">
            <img src={post.image} alt="Media" className="w-full max-h-96 object-cover" />
          </div>
        )}

        {/* Impact Bar */}
        <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-xs">
            {post.missionTag || 'Verified Mission'}
          </span>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-[#1967D2] flex items-center gap-1">
              <Zap className="w-4 h-4 fill-[#4285F4]" />
              +{post.xpEarned} XP
            </span>
            <span className="text-[#34A853] flex items-center gap-1">
              <Shield className="w-4 h-4" />
              +{post.impactScore} Impact
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-3 border-t border-[#F1F3F4] text-xs font-semibold text-[#5F6368]">
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              setLikes(isLiked ? likes - 1 : likes + 1);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors ${
              isLiked ? 'text-[#EA4335] bg-[#FCE8E6]' : 'hover:bg-[#F8FAFD]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#EA4335]' : ''}`} />
            <span>{likes} Likes</span>
          </button>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            <span>{comments.length} Comments</span>
          </div>
        </div>
      </div>

      {/* Discussion Section */}
      <div className="gdg-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-[#202124]">Guardian Discussion</h3>

        {/* Add Comment Input */}
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            type="text"
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a constructive thought or tip..."
            className="flex-1 h-10 px-4 text-xs bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none"
          />
          <button
            type="submit"
            className="px-4 h-10 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-3 pt-2 divide-y divide-[#F1F3F4]">
          {comments.map((c) => (
            <div key={c.id} className="pt-3 first:pt-0 flex items-start gap-3">
              <img
                src={c.avatar}
                alt={c.author}
                className="w-8 h-8 rounded-full object-cover border border-[#E8EAED] mt-0.5"
              />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#202124]">{c.author}</span>
                  <span className="text-[10px] text-[#80868B]">{c.time}</span>
                </div>
                <p className="text-[#5F6368] mt-1 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
