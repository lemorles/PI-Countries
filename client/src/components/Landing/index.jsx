import React from "react";
import { NavLink } from "react-router-dom";
import earth from "../../images/earth.svg";
import "./index.css";

export default function Landing() {
  return (
    <main className="landing-container">
      <div>
        <h1 className="landing-title">
          Countries App
          <br />
          Project
        </h1>
        <p className="landing-text">
          This is an individual project in which all the concepts learned during
          the Henry's bootcamp will be integrated.
        </p>
        <NavLink to={"/home"} className="btn-primary">
          Enter the project!
        </NavLink>
      </div>

      <img src={earth} alt="earth" className="landing-image" />
    </main>
  );
}
