import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNo: "",
  });

  const navigate = useNavigate();

  const decoded = getUserInfoFromToken(localStorage.getItem("token"));

  useEffect(() => {
    const getUserData = async () => {
      const response = await userService.findUserByEmail(decoded.sub);
      setUser(response);
      setFormData({
        firstName: response.firstName || "",
        lastName: response.lastName || "",
        username: response.username || "",
        phoneNo: response.phoneNo || "",
      });
    };
    getUserData();
  }, [decoded.sub]);

  if (!user) {
    return (
      <div className="body">
        <Navbar />
        <div className="container d-flex justify-content-center mt-5">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setShowModal(false);
    const updatedUser = await userService.editProfile(user.id, formData);
    setUser(updatedUser);
  };

  const handleDeactivate = async () => {
    const response = await userService.deleteAccount(user.email);
    if (response) {
      localStorage.clear();
      setShowModal(false);
      navigate("/");
    }
  };

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
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="profile-username">@{user?.username}</p>

            <button
              className="btn btn-outline-primary mt-2"
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </button>
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

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={() => setShowModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeactivate}
                >
                  Delete Account
                </button>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
