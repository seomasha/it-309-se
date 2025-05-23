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
import { startupService } from "../service/startupService";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [userStartups, setUserStartups] = useState([]);
  const [editStartup, setEditStartup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNo: "",
  });

  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");
  const [showStartupModal, setShowStartupModal] = useState(false);
  const [startupFormData, setStartupFormData] = useState({
    name: "",
    description: "",
    industry: "",
    location: "",
    logoUrl: "",
    size: "",
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

  useEffect(() => {
    const getUserStartups = async () => {
      const response = await startupService.getStartupbyOwnerId(user.id);
      setUserStartups(response);
    };
    if (user) {
      getUserStartups();
    }
  }, [user]);

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

  const handleSaveStartup = async () => {
    if (editStartup) {
      await startupService.updateStartup(editStartup.id, startupFormData);
    } else {
      await startupService.create({
        ...startupFormData,
        ownerId: user.id,
      });
    }
    setEditStartup(null);
    setShowStartupModal(false);
    const updated = await startupService.getStartupbyOwnerId(user.id);
    setUserStartups(updated);
  };

  const handleDeleteStartup = async (id) => {
    const response = await startupService.deleteStartup(id);
    if (response) {
      toast.success(response);
      const updated = await startupService.getStartupbyOwnerId(user.id);
      setUserStartups(updated);
      setShowStartupModal(false);
    }
  };

  const isDeleteInputValid = deleteConfirmationInput === user.username;

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
            <IoIosAddCircle
              size={24}
              className="primary-color"
              onClick={() => {
                setStartupFormData({
                  name: "",
                  description: "",
                  industry: "",
                  location: "",
                  logoUrl: "",
                  size: "",
                });
                setEditStartup(null);
                setShowStartupModal(true);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 p-3">
            {userStartups.length === 0 && (
              <p className="text-center primary-color">
                You have no startups yet. Click the plus icon to create one!
              </p>
            )}
            {userStartups.map((startup) => (
              <StartupCard
                key={startup.id}
                logo={blankProfile}
                name={startup.name}
                description={startup.description}
                industry={startup.industry}
                companySize={startup.size}
                location={startup.location}
                onClick={() => {
                  setStartupFormData({
                    name: startup.name,
                    description: startup.description,
                    industry: startup.industry,
                    location: startup.location,
                    logoUrl: startup.logoUrl,
                    size: startup.size,
                  });
                  setEditStartup(startup);
                  setShowStartupModal(true);
                }}
                profile
              />
            ))}
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

                  <hr />
                  <div className="mb-3">
                    <label className="form-label text-danger">
                      To delete your account, type your username:{" "}
                      <strong>{user.username}</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your username to confirm"
                      value={deleteConfirmationInput}
                      onChange={(e) =>
                        setDeleteConfirmationInput(e.target.value)
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeactivate}
                  disabled={!isDeleteInputValid}
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

      {showStartupModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={() => setShowStartupModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">Create Startup</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowStartupModal(false)}
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={startupFormData.name}
                      onChange={(e) =>
                        setStartupFormData({
                          ...startupFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={startupFormData.description}
                      onChange={(e) =>
                        setStartupFormData({
                          ...startupFormData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Industry</label>
                    <input
                      type="text"
                      className="form-control"
                      name="industry"
                      value={startupFormData.industry}
                      onChange={(e) =>
                        setStartupFormData({
                          ...startupFormData,
                          industry: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={startupFormData.location}
                      onChange={(e) =>
                        setStartupFormData({
                          ...startupFormData,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Company Size</label>
                    <input
                      type="text"
                      className="form-control"
                      name="size"
                      value={startupFormData.size}
                      onChange={(e) =>
                        setStartupFormData({
                          ...startupFormData,
                          size: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Logo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="logoUrl"
                      value={startupFormData.logoUrl}
                      onChange={(e) =>
                        setStartupFormData({
                          ...startupFormData,
                          logoUrl: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteStartup(editStartup.id)}
                >
                  Delete Startup
                </button>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditStartup(null);
                      setShowStartupModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveStartup}
                  >
                    Create
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
