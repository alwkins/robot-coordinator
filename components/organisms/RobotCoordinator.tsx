import React, { useEffect, useState } from "react";
import { Robot } from "../../util/types";
import { RobotPanel } from "../molecules/RobotPanel";
import { RobotSelector } from "../molecules/RobotSelector";
import styles from "./RobotCoordinator.module.css";
import {
  robotsCollection,
  docSnapToRobot,
  stopRobotTask,
  startRobotTaskwCheck,
} from "../../firebase/clientApp";
import { onSnapshot } from "firebase/firestore";

export interface RobotCoordinatorProps {}

export const RobotCoordinator = (props: RobotCoordinatorProps) => {
  const [selectedRobotIndex, setselectedRobotIndex] = useState(0); // Init with first robot selected
  const [robots, setRobots] = useState<Array<Robot>>([]);

  const robotListener = () =>
    onSnapshot(robotsCollection, (snapshot) =>
      setRobots(snapshot.docs.map((doc) => docSnapToRobot(doc)))
    );

  const startTaskOnRobot = (
    robotId: string,
    taskId: string,
    taskDurationS: number
  ) => {
    // Start robot task, will use database transaction to check first if robot is busy
    startRobotTaskwCheck(robotId, taskId, "Coordinator")
      .then((res) => {
        console.log("Task set successfully!");
        // In real world, robot would report back to database when task finished
        // Simulate here with delayed function call
        setTimeout(() => {
          stopRobotTask(robotId);
          console.log(
            `Simulating robot ${robotId} reporting task ${taskId} finished`
          );
        }, taskDurationS * 1000);
      })
      .catch((err) => console.log("Error starting task!", err));
  };

  useEffect(robotListener, []);

  if (robots.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.loginBar}>
        <span>
          <b>USER: </b>Alison
        </span>
        <div>
          <b>LOG OUT</b>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <RobotSelector
          robots={robots}
          selectedIndex={selectedRobotIndex}
          onSelect={setselectedRobotIndex}
        />
        <RobotPanel
          robot={robots[selectedRobotIndex]}
          startTask={startTaskOnRobot}
        />
      </div>
    </div>
  );
};
