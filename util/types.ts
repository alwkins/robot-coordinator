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