import React from "react";

const StartupCard = ({ logo, name, description, onClick }) => {
  return (
    <div
      className="startup-card border rounded-4 shadow-sm"
      style={{ width: "300px" }}
    >
      {logo && (
        <img
          src={logo}
          alt={`${name} logo`}
          className="startup-logo mb-3"
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
          }}
        />
      )}
      <div className="p-3">
        <h3 className="startup-name mb-2">{name}</h3>
        <p className="startup-description mb-3">{description}</p>
        <button
          className="btn btn-outline-primary w-100 mt-5"
          onClick={onClick}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default StartupCard;
