import mongoose, { Document } from "mongoose";
import { ITask } from "../types/task";

const TaskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model<ITask & Document>("Task", TaskSchema);
export default Task;
