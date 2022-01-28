import React from 'react';
import { RobotPanel } from '../molecules/RobotPanel';
import { RobotSelector } from '../molecules/RobotSelector';
import styles from './RobotCoordinator.module.css';

export const RobotCoordinator = () => {
  return (
    <div className={styles.container}>
      <RobotSelector />
      <RobotPanel />
    </div>
  )
}