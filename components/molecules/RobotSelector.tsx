import React from "react";
import { Robot } from "../../util/types";
import styles from "./RobotSelector.module.css";

interface RobotSelectorProps {
  robots: Array<Robot>;
  selectedIndex: number;
  onSelect: (number) => void;
}

export const RobotSelector = (props: RobotSelectorProps) => {
  const { robots, selectedIndex, onSelect } = props;
  const onClickHandler = (event) => {
    // Find which robot selected by matching div id to robot id
    onSelect(robots.findIndex((robot) => robot.id === event.target.id));
  };
  return (
    <div className={styles.container}>
      {robots.map((r, index) => {
        return index === selectedIndex ? (
          // Show selected robot name highlighted
          <div
            key={r.id}
            id={r.id}
            className={`${styles.item} ${styles.selected}`}
          >
            {r.name}
          </div>
        ) : (
          // No onClick for currently selected, we don't care if selected again
          <div
            key={r.id}
            id={r.id}
            className={styles.item}
            onClick={onClickHandler}
          >
            {r.name}
          </div>
        );
      })}
    </div>
  );
};
