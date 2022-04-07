import React from "react";
import { NavLink } from "react-router-dom";

export default function Error404() {
  return (
    <div className="country-container error-header">
      <h1>
        Ups.. <br /> The page is not exists.
      </h1>
      <NavLink to="/home" className="btn-primary">
        Back to home
      </NavLink>
    </div>
  );
}
