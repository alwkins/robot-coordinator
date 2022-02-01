import React from "react";
import styles from "./ErrorPopup.module.css";

export interface ErrorPopupProps {
  message: string;
  onAcknowledge: () => void; // Runs when OK is pressed
}

export const ErrorPopup = (props: ErrorPopupProps) => {
  const { message, onAcknowledge } = props;
  return (
    <div className={styles.container}>
      <span className={styles.redText}>Error!</span>
      <span className={styles.text}>{message}</span>
      {/*Button copied from RobotPanel, TODO make component*/}
      <div className={styles.button} onClick={onAcknowledge}>OK</div>
    </div>
  );
};
