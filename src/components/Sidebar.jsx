import React from "react";
import "./sideBar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">
            <i className="bi bi-file-earmark-text"></i>
            <span>Reports</span>
          </a>
        </li>

     
        <li className="nav-item">
          <Link to="/inventory" className="nav-link">
            <i className="bi bi-box"></i>
            <span>Inventory</span>
          </Link>
        </li>

       

        <div className="footer-div">
          <span>
            &copy; {new Date().getFullYear()} Anesi. All rights reserved.
          </span>
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
