export interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
  completedFilter: boolean | undefined;
}
