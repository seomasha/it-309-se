import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import blankImage from "../assets/blank-profile.png";
import { getUserInfoFromToken } from "../utils/jwtDecode";
import { userService } from "../service/userService";
import { startupService } from "../service/startupService";
import { postService } from "../service/postService";
import Post from "../components/Post";
import { TiUserAdd } from "react-icons/ti";

const Home = () => {
  const [user, setUser] = useState(null);
  const [userStartups, setUserStartups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem("token");
  const decoded = token ? getUserInfoFromToken(token) : null;

  useEffect(() => {
    const getUserData = async () => {
      if (!decoded?.sub) return;
      
      try {
        const response = await userService.findUserByEmail(decoded.sub);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    if (decoded) {
      getUserData();
    }
  }, [decoded?.sub]);

  useEffect(() => {
    const getUserStartups = async () => {
      try {
        const response = await startupService.getStartupbyOwnerId(user.id);
        setUserStartups(response);
      } catch (error) {
        console.error("Error fetching startups:", error);
        setUserStartups([]);
      }
    };
    
    if (user?.id) {
      getUserStartups();
    }
  }, [user?.id]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await postService.getAllPosts();
      setPosts(postsData || []);
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      console.error("Cannot create post: content is empty");
      return;
    }
    
    if (!user?.id) {
      console.error("Cannot create post: user ID not available", user);
      return;
    }

    try {
      const postData = {
        content: newPostContent,
        authorId: user.id,
        imageUrl: null
      };
      
      await postService.createPost(postData);
      setNewPostContent("");
      loadPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handlePostLike = (postId) => {
    loadPosts();
  };

  const handlePostComment = (postId) => {
    loadPosts();
  };

  if (!token || !decoded) {
    return (
      <div className="body">
        <Navbar />
        <div className="container mt-5 text-center">
          <h3>Please login to access the home page</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <Navbar />

      <div className="col-12 d-flex container gap-4 mt-5">
        <div className="col-3">
          <div className="bg-white border rounded-4 text-center py-3">
            <img src={blankImage} width={150} className="rounded-circle" />
            <h5 className="primary-color mt-3">
              {user?.firstName} {user?.lastName}
            </h5>
            <p>@{user?.username}</p>
            <Link to="/myprofile" className="btn btn-outline-primary mt-5">
              Go to my profile
            </Link>
          </div>
          <div className="bg-white border rounded-4 text-center py-3 mt-3">
            <h5 className="primary-color">My Startups</h5>
            {userStartups.length > 0 ? (
              userStartups.map((startup) => (
                <div key={startup.id} className="align-items-center text-start mx-4 py-2">
                  <p>{startup.name}</p>
                </div>
              ))
            ) : (
              <p>No startups found</p>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="bg-white border rounded-4 py-3">
            <div className="d-flex align-items-center">
              <img
                src={blankImage}
                width={28}
                className="rounded-circle mx-3"
              />
              <p className="my-auto text-secondary">{user?.username}</p>
            </div>
            <textarea
              className="form-control border-0 mt-3 px-3"
              placeholder="What's on your mind?"
              style={{ height: "80px", resize: "none" }}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <div className="d-flex justify-content-end mt-2 mx-4">
              <button 
                className="btn btn-primary"
                onClick={handleCreatePost}
                disabled={!newPostContent.trim() || !user?.id}
              >
                Post
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center mt-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <Post 
                key={post.id} 
                post={post} 
                currentUser={user}
                onLike={handlePostLike}
                onComment={handlePostComment}
              />
            ))
          ) : (
            <div className="text-center mt-4">
              <p>No posts to display</p>
            </div>
          )}
        </div>

        <div className="col-3">
          <div className="bg-white border rounded-4 py-3 text-center">
            <h6 className="primary-color">Recommended</h6>

            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mt-3 my-auto text-start"
              >
                <div className="d-flex align-items-center mt-3">
                  <img
                    src={blankImage}
                    width={50}
                    className="rounded-circle mx-3"
                    alt="profile"
                  />
                  <div className="mt-2 lh-sm">
                    <h6 className="primary-color mb-0">
                      Sead Masetic
                      <br />
                      <span className="text-secondary">@seadmasetic</span>
                    </h6>
                  </div>
                </div>
                <button className="btn btn-outline-primary mt-3 mx-3">
                  <TiUserAdd />
                </button>
              </div>
            ))}

            <Link to="/friends" className="btn btn-outline-primary mt-4">
              Check out more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;