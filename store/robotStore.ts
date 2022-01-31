import { getRobotsAsync } from "../firebase/clientApp";
import { Robot } from "../util/types";
import { ROBOTS } from "./dummyData";

export default class RobotStore {
  // Singleton class for repo pattern

  private static instance: RobotStore;
  private robots: Array<Robot>;

  static getInstance(): RobotStore {
    if (!RobotStore.instance) {
      RobotStore.instance = new RobotStore();
    }
    return RobotStore.instance;
  }

  loadRobots = async () => {
    this.robots = [];
    getRobotsAsync()
      .then((value) => {
        console.log("loadRobots value", value);
        this.robots = value;
      })
      .catch((err) => console.log(err));
  };

  handleGetRobots = () => {};
}
