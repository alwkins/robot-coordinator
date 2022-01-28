import React from "react";
import { Robot } from "../../util/types";
import styles from "./RobotPanel.module.css";

export interface RobotPanelProps {
  robot: Robot;
}

export const RobotPanel = (props: RobotPanelProps) => {
  const { robot } = props;
  return (
    <div className={styles.container}>
      <div className={styles.statusContainer}>
        <span className={styles.statusText}>Robot Name: {robot.name}</span>
        <span className={styles.statusText}>Robot ID: {robot.id}</span>
        <span className={styles.statusText}>
          Status:{" "}
          {robot.isAvailable ? (
            <span className={styles.available}>Available</span>
          ) : (
            <span className={styles.busy}>
              {robot.activeTask.activeDescription}
            </span>
          )}
        </span>
        {robot.isAvailable ? null : (
          <span className={styles.statusText}>
            Operated By: {robot.operatedBy}
          </span>
        )}
      </div>
      <img
        className={
          robot.isAvailable
            ? styles.image
            : `${styles.imageAnimation} ${styles.image}`
        }
        src="/images/robot-cook.png"
        alt="robot cook"
        width="240"
        height="162"
      />
      <span className={styles.statusText}>Start Task</span>
      {robot.availableTasks.map((task) => {
        return <div className={styles.button}>{task.description}</div>;
      })}
    </div>
  );
};
