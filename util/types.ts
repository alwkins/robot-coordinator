export interface Task {
  id: string;
  description: string;
  activeDescription: string;
  durationS: number;
}

export interface Robot {
  name: string;
  id: string;
  isAvailable: boolean;
  activeTaskId: string;
  availableTasks: Array<Task>;
  operatedBy: string;
}

export const getTaskById = (taskArray: Array<Task>, taskId: string): Task => {
  return taskArray.find(task => task.id === taskId);
}