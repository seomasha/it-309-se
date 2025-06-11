package com.ibustartup.ibustartup.service;

import com.ibustartup.ibustartup.dto.CreateCommentDTO;
import com.ibustartup.ibustartup.dto.CreatePostDTO;
import com.ibustartup.ibustartup.model.Comment;
import com.ibustartup.ibustartup.model.Post;
import java.util.List;

public interface PostService {
    Post createPost(CreatePostDTO dto);
    List<Post> getAllPosts();
    Post getPostById(Long id);
    void deletePost(Long id);
    Post likePost(Long postId, Long userId);
    Comment addComment(Long postId, CreateCommentDTO dto);
    List<Comment> getComments(Long postId);
}
