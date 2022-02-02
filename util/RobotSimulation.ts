import { startRobotTaskwCheck, stopRobotTask } from "../firebase/clientApp";

export class RobotSimulation {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  startTask(taskId: string, user: string) {
    return startRobotTaskwCheck(this.id, taskId, user)
  }

  startTaskExecution(taskId: string, durationS: number) {
    // In real world, robot would report back to database when task finished
    // Simulate here with delayed function call
    setTimeout(() => {
      stopRobotTask(this.id); // Tell database task is finished
      console.log(
        `Simulating robot ${this.id} reporting task ${taskId} finished`
      );
    }, durationS * 1000);
  }

  stopTask() {
    return stopRobotTask(this.id)
  }

  doesTaskFail() {
    // Simulate failure 50% of the time
    return Math.random() > 0.5
  }

  // finishTask(taskId: string) {
  //   this.doesTaskFail() ? failRobotTask(this.id, taskId) : stopRobotTask(this.id)
  // }

}
