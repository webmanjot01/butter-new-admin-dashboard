import React, { useState } from "react";
import "./layout.css";
import { FaBarsStaggered } from "react-icons/fa6";
import SideBarItems from "./SideBarItems";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const [isLarge, setIslarge] = useState(true);
  const nagigate = useNavigate();
  return (
    <>
      <div className="main-layout">
        <div
          className={`sidebar-main ${
            isLarge ? "sidebar-large" : "sidebar-small"
          }`}
        >
          <div className="logo-main"> {isLarge ? "Butter" : "Butter"} </div>
          <SideBarItems isLarge={isLarge} />
        </div>
        <div className="right-main">
          <div className="navbar-main">
            <div>
              <FaBarsStaggered
                className="cursor"
                onClick={() => setIslarge(!isLarge)}
              />
            </div>
            <div className="right-items">
              <div
                role="button"
                onClick={() => {
                  localStorage.clear();
                  nagigate("/login");
                }}
                className="cursor-pointer"
              >
                Logout
              </div>
            </div>
          </div>
          <div className="main-content">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
