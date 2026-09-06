'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from '@/lib/gamification-context';
import { mockCommunityPosts, mockLeaderboard } from '@/lib/mock-data';
import { CommunityPost } from '@/types';
import {
  Heart,
  MessageSquare,
  Share2,
  PlusCircle,
  Sparkles,
  Zap,
  Shield,
  MapPin,
  Image as ImageIcon,
  Send,
  X,
  Flame,
  CheckCircle2,
} from 'lucide-react';

import { communityApi } from '@/lib/api/community';

export default function CommunityPage() {
  const { player, addToast, awardPlayerXpAndImpact, refreshPlayerData } = useGamification();
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Tree Plantation');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'All' | 'Trending' | 'My Zone'>('All');

  const loadPosts = React.useCallback(async () => {
    try {
      const livePosts = await communityApi.getPosts('Approved');
      if (livePosts && livePosts.length > 0) {
        setPosts(livePosts);
      }
    } catch (err) {
      console.warn('Could not load community posts:', err);
    }
  }, []);

  React.useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleLike = async (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
          };
        }
        return post;
      })
    );

    try {
      await communityApi.toggleLike(id);
    } catch {
      // optimistic fallback
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    awardPlayerXpAndImpact(50, 10);

    try {
      await communityApi.createPost(newContent, newTag, selectedImage || undefined);
      await loadPosts();
      await refreshPlayerData();
    } catch {
      // optimistic local fallback
      const newPost: CommunityPost = {
        id: `post_${Date.now()}`,
        author: {
          name: player.name,
          username: player.username || 'guardian',
          avatar: player.avatar,
          level: player.level,
          rank: player.rank,
          location: 'Zone 04 - Dwarka Greens',
        },
        content: newContent,
        missionTag: newTag,
        xpEarned: 150,
        impactScore: 35,
        likes: 1,
        isLiked: true,
        commentsCount: 0,
        createdAt: 'Just now',
      };
      setPosts([newPost, ...posts]);
    }

    setNewContent('');
    setSelectedImage(null);
    setShowCreateModal(false);

    addToast({
      title: '📣 Contribution Published!',
      description: 'Your environmental update was posted to the community feed. +50 XP bonus!',
      type: 'success',
      xpReward: 50,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Post Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#202124] tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#34A853]" />
            <span>Community Action Feed</span>
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-0.5">
            Connect with fellow Guardians, share verified climate actions, and cheer community impact.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Contribution</span>
        </button>
      </div>

      {/* Main Grid: Feed + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Feed */}
        <div className="lg:col-span-8 space-y-4">
          {/* Feed Filter Pills */}
          <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-[#E8EAED] w-fit">
            {(['All', 'Trending', 'My Zone'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-[#E8F0FE] text-[#1967D2]'
                    : 'text-[#5F6368] hover:text-[#202124]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="gdg-card p-12 bg-white text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#E8F0FE] text-[#1967D2] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#202124]">No community posts yet</h3>
                <p className="text-xs text-[#5F6368] max-w-sm mx-auto">
                  Be the first Guardian to post your verified clean air actions, tree plantations, or environmental contributions!
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#4285F4] text-white text-xs font-bold shadow-xs hover:bg-[#3367D6]"
                >
                  Create First Post
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="gdg-card p-5 sm:p-6 bg-white space-y-4">
                  {/* Author Info */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E8EAED]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#202124]">{post.author.name}</span>
                          <span className="px-2 py-0.2 rounded-full bg-[#E8F0FE] text-[#1967D2] font-black text-[10px]">
                            L{post.author.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#5F6368]">
                          <span>{post.author.rank}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-[#80868B]">
                            <MapPin className="w-3 h-3 text-[#EA4335]" />
                            {post.author.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] text-[#80868B]">{post.createdAt}</span>
                  </div>

                  {/* Post Content */}
                  <p className="text-xs sm:text-sm text-[#202124] leading-relaxed font-normal">
                    {post.content}
                  </p>

                  {/* Optional Media */}
                  {post.image && (
                    <div className="rounded-2xl overflow-hidden border border-[#E8EAED] max-h-80">
                      <img
                        src={post.image}
                        alt="Contribution media"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Mission Impact Strip */}
                  <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-[10px]">
                        {post.missionTag || 'Verified Action'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold">
                      <span className="text-[#1967D2] flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-[#4285F4]" />
                        +{post.xpEarned} XP
                      </span>
                      <span className="text-[#34A853] flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" />
                        +{post.impactScore} Impact
                      </span>
                    </div>
                  </div>

                  {/* Interaction Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F1F3F4] text-xs text-[#5F6368] font-semibold">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors ${
                        post.isLiked
                          ? 'text-[#EA4335] bg-[#FCE8E6]'
                          : 'hover:bg-[#F8FAFD] hover:text-[#202124]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${post.isLiked ? 'fill-[#EA4335] text-[#EA4335]' : ''}`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    <Link
                      href={`/community/${post.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#F8FAFD] hover:text-[#202124] transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount} Comments</span>
                    </Link>

                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        addToast({
                          title: 'Link Copied',
                          description: 'Contribution link copied to clipboard.',
                          type: 'info',
                        });
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#F8FAFD] hover:text-[#202124] transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Community Sidebar */}
        <div className="lg:col-span-4 space-y-5">
          {/* Trending Challenges Card */}
          <div className="gdg-card p-5 bg-white space-y-3">
            <h3 className="text-xs font-bold text-[#80868B] uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#EA4335]" />
              <span>Trending Environmental Quests</span>
            </h3>

            <div className="space-y-2">
              {[
                { title: 'Roadside Dust Mitigation', players: 184, reward: '+180 XP' },
                { title: 'Zone 04 Sapling Sprint', players: 142, reward: '+250 XP' },
                { title: 'Zero Idle Parking Pledge', players: 96, reward: '+100 XP' },
              ].map((q, idx) => (
                <Link
                  key={idx}
                  href="/missions"
                  className="block p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] hover:bg-[#E8F0FE]/40 hover:border-[#D2E3FC] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#202124]">
                    <span>{q.title}</span>
                    <span className="text-[#1967D2]">{q.reward}</span>
                  </div>
                  <span className="text-[10px] text-[#5F6368] mt-0.5 block">
                    {q.players} active contributors
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Community Contributors */}
          <div className="gdg-card p-5 bg-white space-y-3">
            <h3 className="text-xs font-bold text-[#80868B] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FBBC05]" />
              <span>Top Zone Contributors</span>
            </h3>

            <div className="space-y-2.5">
              {mockLeaderboard.slice(0, 4).map((c) => (
                <div key={c.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#E8EAED]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#202124] block">{c.name}</span>
                      <span className="text-[10px] text-[#5F6368]">Level {c.level}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#34A853]">+{c.impact} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Contribution Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#E8EAED]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F4]">
              <h3 className="text-base font-bold text-[#202124]">Share Your Environmental Action</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#80868B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-[#202124] block mb-1">
                  Category Tag
                </label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-[#F8FAFD] border border-[#DADCE0] rounded-xl outline-none"
                >
                  <option>Tree Plantation</option>
                  <option>Roadside Dust Mitigation</option>
                  <option>Illegal Waste Report</option>
                  <option>Air Filter Maintenance</option>
                  <option>Public Transit Commute</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#202124] block mb-1">
                  What did you accomplish today?
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your environmental action, location, and the impact created..."
                  className="w-full p-3 text-xs bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#5F6368]">
                  <span className="px-2.5 py-1 rounded-xl bg-[#E8F0FE] text-[#1967D2] font-black">
                    +50 XP Guaranteed
                  </span>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Action</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
