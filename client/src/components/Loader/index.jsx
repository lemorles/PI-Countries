import React from "react";
import styles from "./index.module.css";

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bouncer}>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
      </div>
    </div>
  );
}
