import { Task, Robot } from "../util/types";

export const AVAILABLE_TASKS: Array<Task> = [
  {
    id: "task-1",
    description: "Fry Egg",
    activeDescription: "Frying Egg",
    durationS: 3,
  },
  {
    id: "task-2",
    description: "Chop Onion",
    activeDescription: "Chopping Onion",
    durationS: 6,
  },
  {
    id: "task-3",
    description: "Cook Pasta",
    activeDescription: "Cooking Pasta",
    durationS: 9,
  },
];

export const ROBOTS: Array<Robot> = [
  {
    name: "Poxi",
    id: "p8j7h6",
    isAvailable: true,
    activeTaskId: null,
    availableTasks: AVAILABLE_TASKS,
    operatedBy: null,
  },
  {
    name: "Roxi",
    id: "r5g6h7",
    isAvailable: false,
    activeTaskId: "task-0",
    availableTasks: AVAILABLE_TASKS,
    operatedBy: "Anthony Bourdain",
  },
  {
    name: "Loxi",
    id: "l8j6g5",
    isAvailable: true,
    activeTaskId: null,
    availableTasks: AVAILABLE_TASKS,
    operatedBy: null,
  },
];
