import React from "react";
import "./index.css";

export default function Loader() {
  return (
    <div className="container-loader">
      <div className="bouncer">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    </div>
  );
}
