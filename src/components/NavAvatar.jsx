import React from "react";
import profileImage from "../images/Anesi Logo.jpg";

const NavAvatar = () => {
  return (
    <a href="#" className="nav-link d-flex align-items-center pe-5 mt-3">
      <img
        src={profileImage}
        alt="Profile"
        className="rounded-circle"
        style={{ width: "50px", height: "40px" }}
      />
    </a>
  );
};

export default NavAvatar;
