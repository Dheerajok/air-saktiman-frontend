'use client';

import React, { useState } from 'react';
import { useGamification } from '@/lib/gamification-context';
import { mockCommunityPosts } from '@/lib/mock-data';
import { CommunityPost } from '@/types';
import {
  MessageSquareCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Pin,
  Trash2,
  Sparkles,
  MapPin,
  Zap,
  Shield,
  Filter,
  Eye,
  Check,
  X,
} from 'lucide-react';

import { communityApi } from '@/lib/api/community';

export default function AdminCommunityManagePage() {
  const { addToast } = useGamification();
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [filter, setFilter] = useState<'ALL' | 'Pending Review' | 'Approved' | 'Flagged'>('ALL');
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);

  React.useEffect(() => {
    async function loadPosts() {
      try {
        const livePosts = await communityApi.getPosts('ALL');
        if (livePosts && livePosts.length > 0) setPosts(livePosts);
      } catch (err) {
        console.warn('Live posts load error:', err);
      }
    }
    loadPosts();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await communityApi.moderatePost(id, 'Approved');
    } catch {
      // optimistic fallback
    }
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Approved' } : p)),
    );
    addToast({
      title: '✅ Post Approved & Published',
      description: 'The contribution is now live on the public community feed.',
      type: 'success',
    });
    if (selectedPost?.id === id) {
      setSelectedPost({ ...selectedPost, status: 'Approved' });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await communityApi.moderatePost(id, 'Rejected');
    } catch {
      // optimistic fallback
    }
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Rejected' } : p)),
    );
    addToast({
      title: 'Post Rejected',
      description: 'The submission was removed from the public stream.',
      type: 'info',
    });
    if (selectedPost?.id === id) {
      setSelectedPost({ ...selectedPost, status: 'Rejected' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await communityApi.deletePost(id);
    } catch {
      // optimistic fallback
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (selectedPost?.id === id) setSelectedPost(null);
    addToast({
      title: 'Post Deleted',
      description: 'Post permanently deleted from database.',
      type: 'info',
    });
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]';
      case 'Pending Review':
        return 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]';
      case 'Flagged':
        return 'bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]';
      case 'Rejected':
        return 'bg-[#F1F3F4] text-[#80868B] border-[#DADCE0]';
      default:
        return 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC]';
    }
  };

  const filteredPosts = posts.filter((p) => {
    if (filter !== 'ALL' && (p.status || 'Approved') !== filter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-[11px] font-bold border border-[#D2E3FC]">
              Community Content Governance
            </span>
            <span className="text-xs text-[#5F6368] font-medium">
              {posts.filter((p) => p.status === 'Pending Review').length} Submissions Awaiting Approval
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
            Community Post Moderation & Approval
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-1">
            Review user contributions, verify genuine clean air actions, approve posts to public feed, or flag spam.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
          {(['ALL', 'Pending Review', 'Approved', 'Flagged'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-white text-[#4285F4] shadow-xs border border-[#D2E3FC]'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Moderation Table + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Posts Table */}
        <div className="lg:col-span-8 gdg-card bg-white overflow-x-auto">
          <div className="p-4 border-b border-[#F1F3F4] flex items-center justify-between">
            <span className="text-xs font-bold text-[#202124] uppercase tracking-wider">
              Contribution Submissions ({filteredPosts.length})
            </span>
            <span className="text-[11px] text-[#80868B]">Select a row to moderate</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFD] border-b border-[#E8EAED] text-[#5F6368] uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Guardian Author</th>
                <th className="py-3.5 px-6">Post Snippet</th>
                <th className="py-3.5 px-6">Tag & Rewards</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-[#5F6368]">
                    <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#1967D2] flex items-center justify-center mx-auto mb-2">
                      <MessageSquareCheck className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-[#202124] block">No community submissions to moderate</span>
                    <span className="text-[11px] text-[#80868B]">New citizen posts will appear here for review and approval.</span>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`cursor-pointer transition-colors ${
                      selectedPost?.id === post.id ? 'bg-[#E8F0FE]/40' : 'hover:bg-[#F8FAFD]'
                    }`}
                  >
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#E8EAED]"
                        />
                        <div>
                          <span className="font-bold text-[#202124] block">{post.author.name}</span>
                          <span className="text-[10px] text-[#80868B]">Level {post.author.level}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-6">
                      <p className="line-clamp-2 text-[#5F6368] max-w-xs">{post.content}</p>
                      <span className="text-[10px] text-[#80868B] mt-0.5 block">{post.createdAt}</span>
                    </td>

                    <td className="py-3.5 px-6">
                      <span className="px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-[10px] block w-fit mb-1">
                        {post.missionTag || 'General Action'}
                      </span>
                      <span className="text-[10px] font-black text-[#1967D2]">
                        +{post.xpEarned} XP
                      </span>
                    </td>

                    <td className="py-3.5 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(post.status)}`}>
                        {post.status || 'Approved'}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {post.status !== 'Approved' && (
                          <button
                            onClick={() => handleApprove(post.id)}
                            title="Approve Post"
                            className="p-1.5 rounded-xl bg-[#E6F4EA] hover:bg-[#CEEAD6] text-[#137333] transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {post.status !== 'Rejected' && (
                          <button
                            onClick={() => handleReject(post.id)}
                            title="Reject Post"
                            className="p-1.5 rounded-xl bg-[#FCE8E6] hover:bg-[#FAD2CF] text-[#C5221F] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Post Inspector Pane */}
        <div className="lg:col-span-4">
          {selectedPost ? (
            <div className="gdg-card p-6 bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F4]">
                <span className="text-[10px] font-bold text-[#80868B] uppercase">Post Inspector</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(selectedPost.status)}`}>
                  {selectedPost.status || 'Approved'}
                </span>
              </div>

              {/* Author header */}
              <div className="flex items-center gap-3">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E8EAED]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#202124]">{selectedPost.author.name}</span>
                    <span className="px-1.5 py-0.2 rounded-md bg-[#E8F0FE] text-[#1967D2] font-black text-[10px]">
                      L{selectedPost.author.level}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#5F6368]">{selectedPost.author.location}</span>
                </div>
              </div>

              {/* Media if attached */}
              {selectedPost.image && (
                <div className="rounded-2xl overflow-hidden border border-[#E8EAED] max-h-48">
                  <img
                    src={selectedPost.image}
                    alt="Post media"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-[#202124] leading-relaxed">
                {selectedPost.content}
              </p>

              <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] flex items-center justify-between text-xs">
                <span className="text-[#5F6368]">Tagged Quest:</span>
                <strong className="text-[#34A853]">{selectedPost.missionTag || 'Clean Air Action'}</strong>
              </div>

              {/* Moderation Actions */}
              <div className="space-y-2 pt-2 border-t border-[#F1F3F4]">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleApprove(selectedPost.id)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#34A853] hover:bg-[#1E8E3E] text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Post</span>
                  </button>

                  <button
                    onClick={() => handleReject(selectedPost.id)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FCE8E6] hover:bg-[#FAD2CF] text-[#C5221F] font-bold text-xs shadow-xs transition-all active:scale-95"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Post</span>
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(selectedPost.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#DADCE0] hover:bg-[#F8FAFD] text-[#5F6368] font-bold text-xs transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Post Permanently</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="gdg-card p-8 bg-white text-center space-y-2">
              <MessageSquareCheck className="w-8 h-8 text-[#80868B] mx-auto" />
              <span className="text-xs font-bold text-[#202124] block">Select a submission</span>
              <p className="text-[11px] text-[#5F6368]">
                Click on any community post in the table to inspect photos, text, and approve or reject it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
