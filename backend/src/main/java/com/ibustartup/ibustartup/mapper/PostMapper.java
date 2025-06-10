package com.ibustartup.ibustartup.mapper;

import com.ibustartup.ibustartup.dto.PostDTO;
import com.ibustartup.ibustartup.model.Post;

public class PostMapper {
    public static PostDTO toDTO(Post post) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setContent(post.getContent());
        dto.setImageUrl(post.getImageUrl());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setAuthorId(post.getAuthor().getId());
        dto.setAuthorName(
                post.getAuthor().getFirstName() + " " + post.getAuthor().getLastName()
        );
        dto.setLikeCount(post.getLikes().size());
        dto.setCommentCount(post.getComments().size());
        return dto;
    }
}
