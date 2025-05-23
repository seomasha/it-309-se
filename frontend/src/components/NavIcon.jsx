import React from "react";

import blankProfile from "../assets/blank-profile.png";

const NavIcon = ({ icon, title, image = null, onClick }) => {
  return (
    <div
      className="d-flex flex-column align-items-center mx-3 nav-icon"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      {image ? (
        <img src={blankProfile} width={28} className="rounded-5 mb-1" />
      ) : (
        <div className="mb-1">{icon}</div>
      )}
      <div className="title" style={{ fontSize: "0.85rem" }}>
        {title}
      </div>
    </div>
  );
};

export default NavIcon;
