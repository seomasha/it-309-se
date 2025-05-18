import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";
import logo from "../assets/IBUStartupLogo.png";
import SearchBar from "./SearchBar";
import { IoMdHome } from "react-icons/io";
import {
  FaBriefcase,
  FaMoneyBillWaveAlt,
  FaUserFriends,
  FaBell,
} from "react-icons/fa";
import NavIcon from "./NavIcon";
import blankProfile from "../assets/blank-profile.png"; // Replace with your profile image

const Navbar = () => {
  const navigate = useNavigate();

  const navIcons = [
    { id: 1, icon: <IoMdHome size={22} />, title: "Home", route: "/home" },
    {
      id: 2,
      icon: <FaBriefcase size={22} />,
      title: "Startups",
      route: "/startups",
    },
    {
      id: 3,
      icon: <FaMoneyBillWaveAlt size={22} />,
      title: "Investors",
      route: "/investors",
    },
    {
      id: 4,
      icon: <FaUserFriends size={22} />,
      title: "Friends",
      route: "/friends",
    },
    {
      id: 5,
      icon: <FaBell size={22} />,
      title: "Notifications",
      route: "/notifications",
    },
  ];

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="nav d-flex justify-content-between p-3 px-4 border-bottom align-items-center">
      <div className="d-flex primary-color gap-3">
        <img src={logo} width={50} height={40} alt="Logo" />
        <SearchBar />
      </div>

      <div className="d-flex gap-4 align-items-center">
        {navIcons.map((item) => (
          <NavIcon
            key={item.id}
            icon={item.icon}
            title={item.title}
            onClick={() => navigate(item.route)}
          />
        ))}

        <div className="dropdown">
          <img
            src={blankProfile}
            alt="Profile"
            width={30}
            height={30}
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("/myprofile")}
              >
                Visit My Profile
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
