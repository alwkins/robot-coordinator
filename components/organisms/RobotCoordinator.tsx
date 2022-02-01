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
import { ErrorPopup } from "../molecules/ErrorPopup";

/* Future Improvements!

Use Repo Pattern
- Use repository pattern to protect components from accessing firebase/clientApp directly
- Would create a robotStore and userStore to handle robot data and authentication, respectively

Use More Next.js Built-In Functionality
- The built-in API routes and router would be useful if application expanded

Better Error Handling
- Handle errors more gracefully, e.g. network errors
- More finessed usage of async/await and promises

Authentication
- Use Firebase Authentication to do it for real

Proper Buttons
- Should replace <div> with <button>, make into reusable components

Reusable Styling
- Had a lot of duplicate CSS, should make CSS reusable

TypeScript
- Missing types in some places

*/

export interface RobotCoordinatorProps {
  user: string;
}

export const RobotCoordinator = (props: RobotCoordinatorProps) => {
  const [selectedRobotIndex, setselectedRobotIndex] = useState(0); // Init with first robot selected
  const [robots, setRobots] = useState<Array<Robot>>([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const robotListener = () =>
    onSnapshot(robotsCollection, (snapshot) =>
      setRobots(snapshot.docs.map((doc) => docSnapToRobot(doc)))
    );

  const handleErrAck = () => {
    // Close error pop-up when OK is clicked
    setIsError(false);
    setErrorMsg("");
  };

  const startTaskOnRobot = (
    robotId: string,
    taskId: string,
    taskDurationS: number
  ) => {
    // Start robot task, will use database transaction to check first if robot is busy
    startRobotTaskwCheck(robotId, taskId, props.user)
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
      .catch((err) => {
        // Failed with error, display error pop-up
        setErrorMsg(`Could not start task. ${err}`);
        setIsError(true);
      });
  };

  const stopTaskOnRobot = (robotId: string) => {
    // Stop robot task on the robot specified
    stopRobotTask(robotId)
      .then((res) => console.log("Task stopped successfully"))
      .catch((err) => {
        setErrorMsg(`Could not stop task. ${err}`);
        setIsError(true);
      });
  };

  useEffect(robotListener, []); // Sets up realtime updates from database

  if (robots.length === 0) {
    // TODO Display nicer spinner animation
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.outerContainer}>
      {/* Login Bar */}
      <div className={styles.loginBar}>
        <span>
          <b>USER: </b>{props.user}
        </span>
        <div>
          <b>LOG OUT</b>
        </div>
      </div>

      {/* Robot List and Current Robot View */}
      <div className={styles.contentContainer}>
        <RobotSelector
          robots={robots}
          selectedIndex={selectedRobotIndex}
          onSelect={setselectedRobotIndex}
        />
        <RobotPanel
          robot={robots[selectedRobotIndex]}
          startTask={startTaskOnRobot}
          forceReset={stopTaskOnRobot}
        />
      </div>

      {/* Error Pop-Up */}
      {isError ? (
        <ErrorPopup message={errorMsg} onAcknowledge={handleErrAck} />
      ) : null}
    </div>
  );
};
