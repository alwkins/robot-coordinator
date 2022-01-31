import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
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
export const firestore = getFirestore(firebaseApp);

const robotsCollection = collection(firestore, "robots");

const docSnapToRobot = (docSnap: QueryDocumentSnapshot<DocumentData>): Robot => {
  // availableTasks currently always undefined
  // Tasks are stored in separate collection
  const { name, id, availableTasks, activeTaskId, isAvailable, operatedBy } =
    docSnap.data();
  return { name, id, availableTasks, activeTaskId, isAvailable, operatedBy };
};

const docToTask = (docSnap: QueryDocumentSnapshot<DocumentData>): Task => {
  const { id, description, activeDescription, durationS } = docSnap.data();
  return { id, description, activeDescription, durationS };
};

export async function getRobots() {
  try {
    // Get robot data
    const querySnap = await getDocs(robotsCollection);
    const robotData = querySnap.docs.map(
      (docSnap) => docSnapToRobot(docSnap));
    return robotData;
  } catch (err) {
    console.log(err);
  }
}

export async function getRobotById(id: string) {
  const docRef = doc(robotsCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnapToRobot(docSnap);
  } else {
    // doc.data() undefied
    console.log(`Robot with id ${id} not found`);
  }
}
