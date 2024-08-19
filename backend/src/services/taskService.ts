import Task from "../models/taskModel";
import { ITask } from "../types/task";
import mongoose, { FilterQuery } from "mongoose";

export const getTasks = async (
  filter: FilterQuery<ITask>
): Promise<ITask[]> => {
  return await Task.find(filter);
};

export const getTaskById = async (id: string): Promise<ITask | null> => {
  return await Task.findById(id);
};

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  const task = new Task(taskData);
  return await task.save();
};

export const updateTask = async (
  id: string,
  taskData: Partial<ITask>
): Promise<ITask | null> => {
  return await Task.findByIdAndUpdate(id, taskData, { new: true });
};

export const deleteTask = async (id: string): Promise<ITask | null> => {
  return await Task.findByIdAndDelete(id);
};

export const updateTasksOrder = async (
  tasks: FilterQuery<ITask>[],
  filter: FilterQuery<ITask>
): Promise<ITask[]> => {
  const tasksToUpdate = await Task.find(filter).exec();
  const tasksToUpdateIds = tasksToUpdate.map((task) =>
    (task._id as mongoose.Types.ObjectId).toString()
  );

  const tasksToSave: ITask[] = tasks
    .filter((task) =>
      tasksToUpdateIds.includes(
        (task._id as mongoose.Types.ObjectId).toString()
      )
    )
    .map((task) => {
      return new Task(task) as ITask;
    });

  await Task.deleteMany({ _id: { $in: tasksToUpdateIds } });
  return await Task.insertMany(tasksToSave);
};
