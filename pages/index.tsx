import { getRobots } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { RobotCoordinator } from "../components/organisms/RobotCoordinator";
import { Robot } from "../util/types";

interface HomePageProps {
  robots: Array<Robot>;
}

function HomePage() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const robotData = getRobots();

  useEffect(() => {
    robotData.then((res: any) => {
      setRobots(res);
      setLoading(false);
    });
  }, []);

  return loading ? null : <RobotCoordinator />;
}

export default HomePage;
