import styles from '../styles/index.module.css';
import { RobotCoordinator } from '../components/organisms/RobotCoordinator';
import { ROBOTS } from '../store/dummyData';

function HomePage() {
  return (
    <RobotCoordinator robots={ROBOTS} />
  );
}

export default HomePage;