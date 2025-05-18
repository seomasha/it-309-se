import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import blankImage from "../assets/blank-profile.png";
import { getUserInfoFromToken } from "../utils/jwtDecode";
import { userService } from "../service/userService";
import { startupService } from "../service/startupService";
import Post from "../components/Post";
import { TiUserAdd } from "react-icons/ti";

const Home = () => {
  const [user, setUser] = useState(null);
  const [userStartups, setUserStartups] = useState([]);
  const decoded = getUserInfoFromToken(localStorage.getItem("token"));

  useEffect(() => {
    const getUserData = async () => {
      const response = await userService.findUserByEmail(decoded.sub);
      setUser(response);
    };
    getUserData();
  }, [decoded.sub]);

  useEffect(() => {
    const getUserStartups = async () => {
      const response = await startupService.getStartupbyOwnerId(user.id);
      setUserStartups(response);
    };
    if (user) {
      getUserStartups();
    }
  }, [user]);

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
                <div className="align-items-center text-start mx-4 py-2">
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
            <input
              type="text"
              className="form-control border-0 mt-3 px-3"
              placeholder="What's on your mind?"
              style={{ height: "50px" }}
            />
            <div className="d-flex justify-content-end mt-2 mx-4">
              <button className="btn btn-primary">Post</button>
            </div>
          </div>

          <Post />
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
