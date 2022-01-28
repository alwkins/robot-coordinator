import React from 'react';
import styles from './RobotSelector.module.css';

export const RobotSelector = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>Poxi</div>
      <div className={`${styles.item} ${styles.selected}`}>Roxi</div>
      <div className={styles.item}>Loxi</div>
    </div>
  )
}