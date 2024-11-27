import React from "react";
import "./logo.css";

function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items center">
        {/* img */}
        <span className="d-none d-lg-block ">Anesi Dashboard</span>
      </a>
      <i
        className="bi bi-list toggle-side-btn"
        onClick={handleToggleSideBar}
      ></i>
    </div>
  );
}
export default Logo;
