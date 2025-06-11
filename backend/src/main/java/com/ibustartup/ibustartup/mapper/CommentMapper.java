package com.ibustartup.ibustartup.mapper;

import com.ibustartup.ibustartup.dto.CommentDTO;
import com.ibustartup.ibustartup.model.Comment;

public class CommentMapper {
    public static CommentDTO toDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setAuthorId(comment.getAuthor().getId());
        dto.setAuthorName(
                comment.getAuthor().getFirstName() + " " + comment.getAuthor().getLastName()
        );
        return dto;
    }
}
