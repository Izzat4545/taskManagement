import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Task, TasksState } from "../types/tasks";

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
  searchQuery: "",
  completedFilter: undefined,
};

const baseUrl = import.meta.env.VITE_BASEURL;
// Async actions
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params?: { title?: string; completed?: boolean | null }) => {
    const query = new URLSearchParams();
    if (params?.title) query.append("title", params.title);
    if (params?.completed !== undefined && params.completed !== null)
      query.append("completed", String(params.completed));

    const response = await axios.get(`${baseUrl}/tasks?${query.toString()}`);
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask: Omit<Task, "_id">) => {
    const response = await axios.post(baseUrl + "/tasks", newTask);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task) => {
    const response = await axios.put(
      baseUrl + `/tasks/${updatedTask._id}`,
      updatedTask
    );
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await axios.delete(baseUrl + `/tasks/${taskId}`);
    return taskId;
  }
);

export const reorderTasks = createAsyncThunk(
  "tasks/reorderTasks",
  async (newTaskList: Task[], { getState }) => {
    const state = getState() as { tasks: TasksState };
    const { searchQuery, completedFilter } = state.tasks;

    const query = new URLSearchParams();
    if (searchQuery) query.append("title", searchQuery);
    if (completedFilter !== undefined && completedFilter !== null)
      query.append("completed", String(completedFilter));

    const response = await axios.put(`${baseUrl}/tasks?${query.toString()}`, {
      tasks: newTaskList,
    });
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCompletedFilter(state, action: PayloadAction<boolean | undefined>) {
      state.completedFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(reorderTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export const { setSearchQuery, setCompletedFilter } = tasksSlice.actions;

export default tasksSlice.reducer;
