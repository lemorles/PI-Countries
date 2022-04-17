import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/earth.svg";
import github from "../../images/github.svg";
import linkedin from "../../images/linkedin.svg";
import styles from "./index.module.css";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapperLogo}>
        <img src={logo} alt="logo" className={styles.logo} />
        <NavLink to={"/home"} className={styles.link}>
          CountriesApp
        </NavLink>
      </div>
      {pathname === "/home" && (
        <NavLink to={"/activity"} className={`${styles.navlink} btn-secondary`}>
          Create Activity
        </NavLink>
      )}
      {pathname.includes("/country") && (
        <NavLink to={"/activity"} className={`${styles.navlink} btn-secondary`}>
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
            <img src={github} alt="github" className={styles.socialIcon} />
          </a>

          <a
            href="https://www.linkedin.com/in/lemorles/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="linkedin" className={styles.socialIcon} />
          </a>
        </div>
      )}
    </nav>
  );
}
