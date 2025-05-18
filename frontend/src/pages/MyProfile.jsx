import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import background from "../assets/blank-profile.png";
import { IoIosAddCircle } from "react-icons/io";
import "../styles/MyProfile.css";
import StartupCard from "../components/StartupCard";
import blankProfile from "../assets/blank-profile.png";
import { getUserInfoFromToken } from "../utils/jwtDecode";
import { userService } from "../service/userService";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const decoded = getUserInfoFromToken(localStorage.getItem("token"));

  useEffect(() => {
    const getUserData = async () => {
      const response = await userService.findUserByEmail(decoded.sub);
      setUser(response);
    };
    getUserData();
  }, [decoded.sub]);

  if (!user) {
    // Show loading state while user data is being fetched
    return (
      <div className="body">
        <Navbar />
        <div className="container d-flex justify-content-center mt-5">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <Navbar />

      <div className="container d-flex justify-content-center">
        <div className="profile-container mt-3">
          <div
            className="profile-banner"
            style={{
              backgroundImage: `url(${background})`,
            }}
          />
          <div
            className="profile-picture"
            style={{
              backgroundImage: `url(${background})`,
            }}
          />
          <div className="profile-info text-center">
            <h2 className="profile-name">
              {user.firstName} {user.lastName}
            </h2>
            <p className="profile-username">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="border container bg-white p-3 mt-3 border rounded-4 max-width">
        <h6>About me</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit
          voluptatum ipsa dolorem rem quibusdam reprehenderit at. Veritatis amet
          sed similique quisquam quas temporibus, inventore, nisi ab rerum
          dolores nulla!
        </p>
      </div>

      <div className="max-width d-flex gap-3 mt-3">
        <div className="bg-white w-100 rounded-4 border">
          <div className="d-flex justify-content-between p-3">
            <h6 className="mt-2">Friends</h6>
            <h6 className="mt-2 primary-color">426</h6>
          </div>
        </div>
      </div>

      <div className="max-width d-flex gap-3 mt-3 pb-5">
        <div className="bg-white w-100 rounded-4 border">
          <div className="d-flex justify-content-between p-3 align-items-center">
            <h6 className="mt-2">Startups</h6>
            <IoIosAddCircle size={24} className="primary-color" />
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 p-3">
            <StartupCard
              logo={blankProfile}
              name="Tech Innovators"
              description="A startup focused on innovative tech solutions for modern problems."
              onClick={() => alert("Clicked!")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
