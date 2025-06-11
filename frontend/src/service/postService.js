import { apiService, request } from "./apiService";

const POST_ENDPOINT = "/posts";

const postApiService = apiService(POST_ENDPOINT);

export const postService = {
  ...postApiService,
  
  createPost: async (data) => {
    const response = await request(POST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
    return response;
  },

  getAllPosts: async () => {
    const response = await request(POST_ENDPOINT, {
      method: "GET",
    });
    return response;
  },

  getPostById: async (id) => {
    const response = await request(`${POST_ENDPOINT}/${id}`, {
      method: "GET",
    });
    return response;
  },

  deletePost: async (id) => {
    const response = await request(`${POST_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response;
  },

  likePost: async (postId, userId) => {
    const response = await request(`${POST_ENDPOINT}/${postId}/like`, {
      method: "POST",
      params: { userId },
    });
    return response;
  },

  addComment: async (postId, data) => {
    const response = await request(`${POST_ENDPOINT}/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
    return response;
  },

  getComments: async (postId) => {
    const response = await request(`${POST_ENDPOINT}/${postId}/comments`, {
      method: "GET",
    });
    return response;
  },
};