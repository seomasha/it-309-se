import React from "react";

const StartupCard = ({
  logo,
  name,
  description,
  industry,
  location,
  companySize,
  onClick,
}) => {
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
        <h3 className="startup-name mb-2 text-center primary-color">{name}</h3>
        <p className="startup-description mb-5 text-center">{description}</p>
        <p className="startup-description mb-1">Industry: {industry}</p>
        <p className="startup-description mb-1">Location: {location}</p>
        <p className="startup-description mb-1">Company size: {companySize}</p>
        <button
          className="btn btn-outline-primary w-100 mt-5"
          onClick={onClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default StartupCard;
