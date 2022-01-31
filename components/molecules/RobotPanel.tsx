import React from "react";
import { getTaskById, Robot, Task } from "../../util/types";
import styles from "./RobotPanel.module.css";

export interface RobotPanelProps {
  robot: Robot;
  startTask: (robotId: string, taskId: string, taskDurationS: number) => void;
}

export const RobotPanel = (props: RobotPanelProps) => {
  const { robot, startTask } = props;
  const { name, id, isAvailable, activeTaskId, availableTasks, operatedBy } =
    robot;
  const activeTask = getTaskById(availableTasks, activeTaskId)
  const handleStartTask = (event) => {
    const selectedTask = getTaskById(availableTasks, event.target.id);
    startTask(id, selectedTask.id, selectedTask.durationS);
  };
  return (
    <div className={styles.container}>
      {/* Status Display */}
      <div className={styles.statusContainer}>
        <span className={styles.statusText}>Robot Name: {name}</span>
        <span className={styles.statusText}>Robot ID: {id}</span>
        <span className={styles.statusText}>
          Status:{" "}
          {isAvailable ? (
            <span className={styles.available}>Available</span>
          ) : (
            <span className={styles.busy}>{activeTask.activeDescription}</span>
          )}
        </span>
        {isAvailable ? null : (
          <span className={styles.statusText}>Operated By: {operatedBy}</span>
        )}
      </div>

      {/* Graphic */}
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

      {/* Task Buttons */}
      <span className={styles.statusText}>Start Task</span>
      {robot.availableTasks.map((task) => {
        return (
          <div
            className={styles.button}
            key={task.id}
            id={task.id}
            onClick={handleStartTask}
          >
            {task.description}
          </div>
        );
      })}
    </div>
  );
};
