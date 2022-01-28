import React from 'react';
import styles from './RobotPanel.module.css';

export const RobotPanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.statusContainer}>
      <span className={styles.statusText}>Robot Name: Poxi</span>
      <span className={styles.statusText}>Robot ID: 6g5fd43d</span>
      <span className={styles.statusText}>Status: <span className={styles.available}>Available</span></span>
        </div>
      <img className={`${styles.imageAnimation} ${styles.image}`} src="/images/robot-cook.png" alt="robot cook" width="240" height="162" />
      <span className={styles.statusText}>Start Task</span>
      <div className={styles.button}>Fry Egg</div>
      <div className={styles.button}>Chop Onion</div>
      <div className={styles.button}>Cook Pasta</div>
    </div>
  )
}