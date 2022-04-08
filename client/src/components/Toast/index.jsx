import React, { useEffect, useState } from "react";
import check from "../../images/check.svg";
import error from "../../images/error.svg";
import "./index.css";

export default function Toast({ title, type }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    show && (
      <div className={`toast-container toast-position ${type}-bg`}>
        <img
          src={type === "error" ? error : check}
          alt={type === "error" ? error : check}
        />
        <p>{title}</p>
      </div>
    )
  );
}
