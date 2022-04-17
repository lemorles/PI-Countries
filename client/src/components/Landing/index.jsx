import React from "react";
import { NavLink } from "react-router-dom";
import earth from "../../images/earth.svg";
import styles from "./index.module.css";

export default function Landing() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.wrapperContent}>
        <h1 className={styles.title}>
          Countries App
          <br />
          Project
        </h1>
        <NavLink to={"/home"} className={`${styles.btn} btn-primary`}>
          Enter!
        </NavLink>
      </div>

      <img src={earth} alt="earth" className={styles.img} />
    </main>
  );
}
