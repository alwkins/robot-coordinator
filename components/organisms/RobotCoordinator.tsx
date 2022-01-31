import React, { useEffect, useState } from "react";
import { getRobots } from "../../firebase/clientApp";
import { Robot } from "../../util/types";
import { RobotPanel } from "../molecules/RobotPanel";
import { RobotSelector } from "../molecules/RobotSelector";
import styles from "./RobotCoordinator.module.css";
import { robotsCollection, docSnapToRobot } from "../../firebase/clientApp";
import { onSnapshot } from "firebase/firestore";

export interface RobotCoordinatorProps {}

export const RobotCoordinator = (props: RobotCoordinatorProps) => {
  const [selectedRobotIndex, setselectedRobotIndex] = useState(0); // Init with first robot selected
  const [robots, setRobots] = useState<Array<Robot>>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(
    () => 
      onSnapshot(robotsCollection, (snapshot) =>
        setRobots(snapshot.docs.map((doc) => docSnapToRobot(doc)))
      ),
    []
  );
  if (!robots) {
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
        <RobotPanel robot={robots[selectedRobotIndex]} />
      </div>
    </div>
  );
};
