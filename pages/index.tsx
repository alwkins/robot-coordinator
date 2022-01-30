import { firestore } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { RobotCoordinator } from "../components/organisms/RobotCoordinator";
import { ROBOTS } from "../store/dummyData";
import { Robot } from "../util/types";


interface HomePageProps {
  robots: Array<Robot>;
}

function HomePage() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getRobots = async () => {
    const snapshot = await firestore.collectionGroup("robots").get();
    const paths = snapshot.docs.map((doc) => {
      const { name, id, activeTask, isAvailable, availableTasks } = doc.data();
      return { params: { name, id, activeTask, isAvailable, availableTasks } };
    });
    console.log(paths);
    return paths;
  };

  useEffect(() => {
    getRobots();
  }, []);

  return <RobotCoordinator robots={ROBOTS} />;
}

export default HomePage;

/* export async function getServerSideProps() {
  const robotCollection = collection(firestore,'robots');
  console.log(robotCollection);
  return { props: ROBOTS }
} */
