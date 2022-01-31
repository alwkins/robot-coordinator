import { collection, doc, runTransaction, setDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore, getRobotById, getRobots } from "../firebase/clientApp";
import { ROBOTS } from "../store/dummyData";

const robotsCollection = collection(firestore, "robots");

function TestDatabase() {
  const [robotId, setRobotId] = useState("l8j6g5");
  const setDocRobot = async () => {
    const robot = ROBOTS[2];
    const response = await setDoc(doc(robotsCollection, robot.id), {
      name: robot.name,
      isAvailable: robot.isAvailable,
      availableTasks: robot.availableTasks,
      operatedBy: robot.operatedBy,
      activeTaskId: robot.activeTaskId,
    });
    console.log(response); // Comes back undefined
  };
  const startRobotTask = async (
    robotId: string,
    taskId: string,
    operator: string
  ) => {
    const docRef = doc(robotsCollection, robotId);
    const response = await setDoc(
      docRef,
      { isAvailable: false, operatedBy: operator, activeTaskId: taskId },
      { merge: true }
    );
    return response;
  };
  const startRobotTaskwCheck = async (
    robotId: string,
    taskId: string,
    operator: string
  ) => {
    const docRef = doc(robotsCollection, robotId);
    const newTaskStatus = await runTransaction(firestore, async (transact) => {
      const robotDoc = await transact.get(docRef);
      if (!robotDoc.exists()) {
        throw "Robot does not exist";
      }
      const currentIsAvailable = robotDoc.data().isAvailable;
      if (currentIsAvailable) {
        transact.update(docRef, {
          isAvailable: false,
          activeTaskId: taskId,
          operatedBy: operator,
        });
        return currentIsAvailable;
      } else {
        return Promise.reject("Sorry, robot is already busy");
      }
    });
  };
  const handleStart = () => {
    startRobotTask(robotId, "task-2", "Admin Alison");
  };
  const handleGetRobots = () => {
    getRobots()
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  const handleStartwCheck = () => {
    startRobotTaskwCheck(robotId, "task-1", "Start w Check")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  const handleGetRobot = () => {
    getRobotById(robotId)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        name="robot"
        value={robotId}
        onChange={(e) => setRobotId(e.target.value)}
      ></input>
      <button onClick={setDocRobot}>Set Robot from Dummy Data</button>
      <button onClick={handleStart}>Start Task</button>
      <button onClick={handleStartwCheck}>Start Task with Check</button>
      <button onClick={stopRobotTask}>Stop Task</button>
      <button onClick={handleGetRobots}>Get Robots</button>
      <button onClick={handleGetRobot}>Get Robot by ID</button>
    </div>
  );
}

export default TestDatabase;
