package com.ibustartup.ibustartup.service;

import com.ibustartup.ibustartup.dto.CreateCommentDTO;
import com.ibustartup.ibustartup.dto.CreatePostDTO;
import com.ibustartup.ibustartup.model.Comment;
import com.ibustartup.ibustartup.model.Post;
import com.ibustartup.ibustartup.model.User;
import com.ibustartup.ibustartup.repository.CommentRepository;
import com.ibustartup.ibustartup.repository.PostRepository;
import com.ibustartup.ibustartup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepo;
    private final UserRepository userRepo;
    private final CommentRepository commentRepo;

    @Autowired
    public PostServiceImpl(PostRepository postRepo,
                           UserRepository userRepo,
                           CommentRepository commentRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
        this.commentRepo = commentRepo;
    }

    @Override
    public Post createPost(CreatePostDTO dto) {
        User author = userRepo.findById(dto.getAuthorId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Author not found"));
        Post post = new Post();
        post.setContent(dto.getContent());
        post.setImageUrl(dto.getImageUrl());
        post.setAuthor(author);
        return postRepo.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepo.findAll()
                .stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .toList();
    }

    @Override
    public Post getPostById(Long id) {
        return postRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Post not found"));
    }

    @Override
    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }

    @Override
    public Post likePost(Long postId, Long userId) {
        Post post = getPostById(postId);
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"));
        if (!post.getLikes().add(user)) {
            post.getLikes().remove(user);
        }
        return postRepo.save(post);
    }

    @Override
    public Comment addComment(Long postId, CreateCommentDTO dto) {
        Post post = getPostById(postId);
        User author = userRepo.findById(dto.getAuthorId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Author not found"));
        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setPost(post);
        comment.setAuthor(author);
        return commentRepo.save(comment);
    }

    @Override
    public List<Comment> getComments(Long postId) {
        return commentRepo.findByPostId(postId)
                .stream()
                .sorted((a, b) -> a.getCreatedAt().compareTo(b.getCreatedAt()))
                .toList();
    }
}
