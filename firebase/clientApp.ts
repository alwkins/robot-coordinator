import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { Robot, Task } from "../util/types";

const clientCredentials = {
  // TODO Use environment vars so credentials protected
  apiKey: 'AIzaSyB6dB-nMkisYi9zIzTyg1uRNswYxr6QSuY',
  authDomain: 'robot-coordinator.firebaseapp.com',
  projectId: 'robot-coordinator',
  storageBucket: 'robot-coordinator.appspot.com',
  messagingSenderId: '380727187054',
  appId: '1:380727187054:web:b47e25010986d098fcb87f',
};

const firebaseApp = initializeApp(clientCredentials);
const firestore = getFirestore(firebaseApp);

export const robotsCollection = collection(firestore, "robots");

export const docSnapToRobot = (
  // Convert document snapshot to Robot interface
  docSnap: QueryDocumentSnapshot<DocumentData>
): Robot => {
  // availableTasks currently always undefined
  // Tasks are stored in separate collection
  const { name, availableTasks, activeTaskId, isAvailable, operatedBy } =
    docSnap.data();
  return {
    name,
    id: docSnap.id,
    availableTasks,
    activeTaskId,
    isAvailable,
    operatedBy,
  };
};

const docSnapToTask = (docSnap: QueryDocumentSnapshot<DocumentData>): Task => {
  // Convert document snapshot to Task interface
  const { description, activeDescription, durationS } = docSnap.data();
  return { id: docSnap.id, description, activeDescription, durationS };
};

export async function getRobots() {
  // Get robot data from 'robots' collection
  try {
    const querySnap = await getDocs(robotsCollection);
    const robotData = querySnap.docs.map((docSnap) => docSnapToRobot(docSnap));
    return robotData;
  } catch (err) {
    console.log(err);
  }
}

export async function getRobotById(id: string) {
  // Get robot document from 'robots' collection by object ID
  const docRef = doc(robotsCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnapToRobot(docSnap);
  } else {
    console.log(`Robot with id ${id} not found`);
  }
}

/**
 * Start robot task if robot is available
 * @param {string} robotId - The object ID of robot to start task on
 * @param {string} taskId - The task ID of task to start
 * @param {string} operator - The operator's name
 * @return {Promise<void>}
 */
export const startRobotTaskwCheck = async (
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
      const currentOperator = robotDoc.data().operatedBy;
      return Promise.reject(`Robot is already busy with a task from ${currentOperator}.`);
    }
  });
};

/**
 * Stop robot task on specified robot
 * @param {string} robotId - The object ID of the robot
 * @return {Promise<void>}
 */
export const stopRobotTask = async (robotId: string) => {
  const docRef = doc(robotsCollection, robotId);
  const response = await setDoc(
    docRef,
    { isAvailable: true, operatedBy: null },
    { merge: true }
  );
  return response;
};

export interface User  {
  user: string;
  password: string;
}

const validUsers: Array<User> = [
  {
    user: "Gordon Ramsey",
    password: "gordonramsey"
  },
  {
    user: "Julia Child",
    password: "juliachild"
  },
  {
    user: "Ratatouille",
    password: "ratatouille"
  }
]

/**
 * Check if username and password are found in hard-coded array of credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @return {boolean}
 */
export const authenticateUser = (username: string, password: string): boolean => {
  // Return if user is authentic or not
  // Credentials are hard-coded for now
  const match = validUsers.find(user => user.user === username && user.password === password)
  return match ? true : false;
}
