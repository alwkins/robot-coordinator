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
  // Use environment vars so credentials protected
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
