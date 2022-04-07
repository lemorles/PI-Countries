import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/worldwide.png";
import github from "../../images/github.svg";
import linkedin from "../../images/linkedin.svg";
import "./index.css";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <p className="nav-title">
        <img src={logo} alt="logo" className="logo" />
        <NavLink to={"/home"} className="link-white">
          CountriesApp
        </NavLink>
      </p>
      {pathname === "/home" && (
        <NavLink to={"/activity"} className="btn-secondary">
          Create Activity
        </NavLink>
      )}
      {pathname.includes("/country") && (
        <NavLink to={"/activity"} className="btn-secondary">
          Create Activity
        </NavLink>
      )}
      {pathname === "/" && (
        <div>
          <a
            href="https://github.com/lemorles"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github" className="social-icon" />
          </a>

          <a
            href="https://www.linkedin.com/in/lemorles/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="linkedin" className="social-icon" />
          </a>
        </div>
      )}
    </nav>
  );
}
