import {
  failRobotTask,
  startRobotTaskwCheck,
  stopRobotTask,
} from "../firebase/clientApp";

export class RobotSimulation {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  /**
   * Wrapper for write to database to indicate robot start task
   * This might be out of order for how real world would operate
   * Depending on application, may want simulation robot to notify the database itself
   * @param {string} taskId - Task to start
   * @param {string} user - Operator starting task
   * @return {Promise<void} Promise
   */
  startTask(taskId: string, user: string): Promise<void> {
    return startRobotTaskwCheck(this.id, taskId, user);
  }

  /**
   * Simulate execution of task and robot reporting back to database when finished
   * @param {string} taskId - Task to start
   * @param {string} durationS - Task duration in seconds
   * @return {void}
   */
  startTaskExecution(taskId: string, durationS: number): void {
    // In real world, robot would report back to database when task finished
    // Simulate here with delayed function call
    setTimeout(() => {
      this.finishTask(taskId); // Tell database task finished
      console.log(
        `Simulating robot ${this.id} reporting task ${taskId} finished`
      );
    }, durationS * 1000);
  }

  /**
   * Wrapper for write to database to indicate robot stop task
   * @return {Promise<void} Promise
   */
  stopTask(): Promise<void> {
    return stopRobotTask(this.id);
  }

  /**
   * Randomized simulation for task succeeding or failing
   * @return {boolean} Does task succeed or fail
   */
  doesTaskFail(): boolean {
    // Simulate failure 50% of the time
    return Math.random() > 0.5;
  }

  /**
   * Randomized simulation for task succeeding or failing
   * @param {string} taskId - Object ID of task to finish
   * @return {void}
   */
  finishTask(taskId: string): void {
    // This would sim failures, but failRobotTask currently not finished
    // See clientApp.ts
    this.doesTaskFail()
      ? failRobotTask(this.id, taskId)
      : stopRobotTask(this.id);
  }
}
