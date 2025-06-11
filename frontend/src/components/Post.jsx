import React, { useState, useEffect } from "react";
import blankImage from "../assets/blank-profile.png";
import { FaCloud, FaHeart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { postService } from "../service/postService";

const Post = ({ post, currentUser, onLike, onComment }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments, post.id]);

  const loadComments = async () => {
    try {
      const commentsData = await postService.getComments(post.id);
      setComments(commentsData || []);
    } catch (error) {
      console.error("Error loading comments:", error);
      setComments([]);
    }
  };

  const handleLike = async () => {
    if (!currentUser?.id) {
      console.error("Cannot like: user not logged in");
      return;
    }

    try {
      await postService.likePost(post.id, currentUser.id);
      setIsLiked(!isLiked);
      if (onLike) onLike(post.id);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !currentUser?.id) {
      console.error("Cannot comment: missing content or user not logged in");
      return;
    }

    try {
      await postService.addComment(post.id, {
        content: newComment,
        authorId: currentUser.id,
      });
      setNewComment("");
      loadComments();
      if (onComment) onComment(post.id);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown time";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      if (diffHours < 1) return "now";
      if (diffHours < 24) return `${diffHours}h`;
      return date.toLocaleDateString();
    } catch (error) {
      return "Unknown time";
    }
  };

  // Helper function to get display name
  const getDisplayName = (authorName, username) => {
    if (
      authorName &&
      authorName !== "null null" &&
      !authorName.includes("null")
    ) {
      return authorName;
    }
    if (username) {
      return username;
    }
    return "Unknown User";
  };

  // Helper function to get username
  const getUsername = (authorName, username) => {
    if (username) {
      return `@${username}`;
    }
    if (
      authorName &&
      authorName !== "null null" &&
      !authorName.includes("null")
    ) {
      return `@${authorName.toLowerCase().replace(/\s+/g, "")}`;
    }
    return "@unknown";
  };

  const displayName = getDisplayName(post.authorName, currentUser?.username);
  const displayUsername = getUsername(post.authorName, currentUser?.username);

  return (
    <div className="bg-white border rounded-4 my-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={post.imageUrl}
            width={50}
            height={50}
            className="rounded-circle mx-3"
          />
          <div className="mt-2 lh-sm">
            <h6 className="mt-3 primary-color">
              {displayName}
              <br />
            </h6>
            <p>{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <button className="btn btn-outline-primary mx-3">Follow</button>
      </div>

      <p className="mx-3">{post.content}</p>

      <div className="d-flex justify-content-between my-3 mx-3">
        <button
          className={`btn ${
            isLiked ? "btn-primary" : "btn-outline-primary"
          } d-flex gap-2 align-items-center`}
          onClick={handleLike}
          disabled={!currentUser}
        >
          <FaHeart />
          Like ({post.likeCount || 0})
        </button>

        <button
          className="btn btn-outline-primary d-flex gap-2 align-items-center"
          onClick={() => setShowComments(!showComments)}
        >
          <FaCloud />
          Comment ({post.commentCount || 0})
        </button>

        <button className="btn btn-outline-primary d-flex gap-2 align-items-center">
          <IoIosSend />
          Share
        </button>
      </div>

      {showComments && (
        <div className="mx-3 mb-3">
          <div className="border-top pt-3">
            <div className="d-flex gap-2 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                disabled={!currentUser}
              />
              <button
                className="btn btn-primary"
                onClick={handleAddComment}
                disabled={!newComment.trim() || !currentUser}
              >
                Post
              </button>
            </div>

            {comments.map((comment) => (
              <div key={comment.id} className="d-flex gap-2 mb-2">
                <div className="flex-grow-1">
                  <div className="bg-light rounded p-2">
                    <small className="fw-bold">
                      {getDisplayName(
                        comment.authorName,
                        currentUser?.username
                      )}
                    </small>
                    <p className="mb-0 small">{comment.content}</p>
                  </div>
                  <small className="text-muted">
                    {formatDate(comment.createdAt)}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
