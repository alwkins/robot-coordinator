import React from "react";
import styles from "./LoginBox.module.css";

export const LoginBox = () => {
  return (
    <div className={styles.container}>
      <label className={styles.text}>User:</label>
      <input className={styles.text} type="text" id="user" name="user" />
      <label className={styles.text}>Password:</label>
      <input
        className={styles.text}
        type="password"
        id="password"
        name="password"
      />
      {/*Button copied from RobotPanel, TODO make component*/}
      <div className={styles.button}>LOG IN</div>
    </div>
  );
};
