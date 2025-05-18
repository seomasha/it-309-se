import React from "react";

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

const Navbar = () => {
  const navIcons = [
    { id: 1, icon: <IoMdHome size={22} />, title: "Home" },
    { id: 2, icon: <FaBriefcase size={22} />, title: "Startups" },
    { id: 3, icon: <FaMoneyBillWaveAlt size={22} />, title: "Investors" },
    { id: 4, icon: <FaUserFriends size={22} />, title: "Friends" },
    { id: 5, icon: <FaBell size={22} />, title: "Notifications" },
  ];

  return (
    <header className="nav d-flex justify-content-between p-3 px-4 border-bottom align-items-center">
      <div className="d-flex primary-color">
        <img src={logo} width={50} height={40} />
        <SearchBar />
      </div>
      <div className="d-flex gap-4">
        {navIcons.map((item) => (
          <NavIcon key={item.id} icon={item.icon} title={item.title} />
        ))}
      </div>
      <NavIcon image title="My profile" />
    </header>
  );
};

export default Navbar;
