import { apiClient } from './client';
import { CommunityPost } from '@/types';

export const communityApi = {
  async getPosts(status = 'Approved'): Promise<CommunityPost[]> {
    const raw = await apiClient.get<any[]>('/community/posts', { status });
    return raw.map((item) => ({
      id: item._id || item.id,
      author: item.author || {
        name: item.authorName || 'Guardian',
        username: 'guardian',
        avatar: item.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        level: 1,
        rank: item.authorBadge || 'Eco Scout',
        location: item.location || 'Metropolis',
      },
      authorName: item.authorName,
      authorAvatar: item.authorAvatar,
      authorBadge: item.authorBadge,
      location: item.location || 'Metropolis',
      timestamp: item.timestamp || item.createdAt || 'Just now',
      createdAt: item.createdAt || 'Just now',
      content: item.content,
      imageUrl: item.imageUrl,
      image: item.imageUrl,
      xpEarned: item.xpEarned || 150,
      impactScore: item.impactScore || 35,
      likes: item.likes || item.likesCount || (item.likedUserIds?.length || 0),
      likesCount: item.likesCount || (item.likedUserIds?.length || 0),
      commentsCount: item.commentsCount || (item.comments?.length || 0),
      isLiked: item.isLiked || false,
      missionTag: item.missionTag,
      status: item.status || 'Approved',
      comments: (item.comments || []).map((c: any) => ({
        id: c._id || c.id || Math.random().toString(),
        authorName: c.authorName,
        authorAvatar: c.authorAvatar,
        text: c.text,
        timestamp: c.timestamp || 'Just now',
      })),
    }));
  },

  async getPostById(id: string): Promise<CommunityPost> {
    const item = await apiClient.get<any>(`/community/posts/${id}`);
    return {
      id: item._id || item.id,
      author: item.author || {
        name: item.authorName || 'Guardian',
        username: 'guardian',
        avatar: item.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        level: 1,
        rank: item.authorBadge || 'Eco Scout',
        location: item.location || 'Metropolis',
      },
      authorName: item.authorName,
      authorAvatar: item.authorAvatar,
      authorBadge: item.authorBadge,
      location: item.location || 'Metropolis',
      timestamp: item.timestamp || item.createdAt || 'Just now',
      createdAt: item.createdAt || 'Just now',
      content: item.content,
      imageUrl: item.imageUrl,
      image: item.imageUrl,
      xpEarned: item.xpEarned || 150,
      impactScore: item.impactScore || 35,
      likes: item.likes || item.likesCount || (item.likedUserIds?.length || 0),
      likesCount: item.likesCount || (item.likedUserIds?.length || 0),
      commentsCount: item.commentsCount || (item.comments?.length || 0),
      isLiked: item.isLiked || false,
      missionTag: item.missionTag,
      status: item.status || 'Approved',
      comments: (item.comments || []).map((c: any) => ({
        id: c._id || c.id,
        authorName: c.authorName,
        authorAvatar: c.authorAvatar,
        text: c.text,
        timestamp: c.timestamp || 'Just now',
      })),
    };
  },

  async createPost(content: string, missionTag?: string, imageFile?: File): Promise<any> {
    if (imageFile) {
      const formData = new FormData();
      formData.append('content', content);
      if (missionTag) formData.append('missionTag', missionTag);
      formData.append('image', imageFile);
      return apiClient.post('/community/posts', formData, true);
    }
    return apiClient.post('/community/posts', { content, missionTag });
  },

  async toggleLike(postId: string): Promise<any> {
    return apiClient.post(`/community/posts/${postId}/like`);
  },

  async addComment(postId: string, text: string): Promise<any> {
    return apiClient.post(`/community/posts/${postId}/comment`, { text });
  },

  async moderatePost(postId: string, status: 'Approved' | 'Pending Review' | 'Flagged' | 'Rejected'): Promise<any> {
    return apiClient.patch(`/community/admin/moderate/${postId}`, { status });
  },

  async deletePost(postId: string): Promise<any> {
    return apiClient.delete(`/community/admin/posts/${postId}`);
  },
};
