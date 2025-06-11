package com.ibustartup.ibustartup.rest;

import com.ibustartup.ibustartup.dto.*;
import com.ibustartup.ibustartup.mapper.CommentMapper;
import com.ibustartup.ibustartup.mapper.PostMapper;
import com.ibustartup.ibustartup.model.Comment;
import com.ibustartup.ibustartup.model.Post;
import com.ibustartup.ibustartup.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody @Valid CreatePostDTO dto) {
        Post post = postService.createPost(dto);
        return ResponseEntity.ok(PostMapper.toDTO(post));
    }

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts()
                .stream()
                .map(PostMapper::toDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(PostMapper.toDTO(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<PostDTO> likePost(
            @PathVariable Long id,
            @RequestParam Long userId) {
        Post post = postService.likePost(id, userId);
        return ResponseEntity.ok(PostMapper.toDTO(post));
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<CommentDTO> addComment(
            @PathVariable Long id,
            @RequestBody @Valid CreateCommentDTO dto) {
        Comment comment = postService.addComment(id, dto);
        return ResponseEntity.ok(CommentMapper.toDTO(comment));
    }

    @GetMapping("/{id}/comments")
    public List<CommentDTO> getComments(@PathVariable Long id) {
        return postService.getComments(id)
                .stream()
                .map(CommentMapper::toDTO)
                .toList();
    }
}
