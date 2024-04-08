import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SideBarData"; // Assuming you have a file named 'SideBarData.js' exporting SidebarData
import "./SideNavBar.css";

function SideNavBar() {
  const [opensidebar, setopensidebar] = useState(false);

  const showSidebar = () => {
    setopensidebar(true);
  };

  const closeSidebar = () => {
    setopensidebar(false);
  };

  return (
    <>
      <div className="navBar">
        <Link to="#" className="menu-bars">
          <FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={opensidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineClose onClick={closeSidebar} />
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default SideNavBar;
