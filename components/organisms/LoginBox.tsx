import React, { useState } from "react";
import styles from "./LoginBox.module.css";

export interface LoginBoxProps {
  attemptLogin: (user: string, pw: string) => void;
}

export const LoginBox = (props: LoginBoxProps) => {
  const { attemptLogin } = props;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginAttempt = () => {
    attemptLogin(user, password);
  }
  return (
    <div className={styles.container}>
      <label className={styles.text}>User:</label>
      <input
        className={styles.text}
        type="text"
        id="user"
        name="user"
        onChange={(e) => setUser(e.target.value)}
      />
      <label className={styles.text}>Password:</label>
      <input
        className={styles.text}
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {/*Button copied from RobotPanel, TODO make component*/}
      <div className={styles.button} onClick={handleLoginAttempt}>LOG IN</div>
    </div>
  );
};
