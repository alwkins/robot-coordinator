import React, { useState } from "react";
import { Robot } from "../../util/types";
import { RobotPanel } from "../molecules/RobotPanel";
import { RobotSelector } from "../molecules/RobotSelector";
import styles from "./RobotCoordinator.module.css";

export interface RobotCoordinatorProps {
  robots: Array<Robot>;
}

export const RobotCoordinator = (props: RobotCoordinatorProps) => {
  const [selectedRobot, setselectedRobot] = useState(1);
  const { robots } = props;
  return (
    <div className={styles.outerContainer}>
      <div className={styles.loginBar}>
        <span>
          <b>USER:  </b>Alison
        </span>
        <div>
          <b>LOG OUT</b>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <RobotSelector
          robots={robots}
          selectedIndex={selectedRobot}
          onSelect={setselectedRobot}
        />
        <RobotPanel robot={robots[selectedRobot]} />
      </div>
    </div>
  );
};
