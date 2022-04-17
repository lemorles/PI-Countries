import React, { useEffect, useState } from "react";
import check from "../../images/check.svg";
import error from "../../images/error.svg";
import styles from "./index.module.css";

export default function Toast({ title, type }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    show && (
      <div
        className={`${styles.wrapper} ${styles.toastPosition} ${
          type === "success" ? styles.success : styles.error
        }`}
      >
        <img
          src={type === "error" ? error : check}
          alt={type === "error" ? error : check}
        />
        <p>{title}</p>
      </div>
    )
  );
}
