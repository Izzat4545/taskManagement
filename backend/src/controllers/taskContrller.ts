import { Request, Response } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTasksOrder,
} from "../services/taskService";
import { ITask } from "../types/task";
import { FilterQuery } from "mongoose";

export const getTasksHandler = async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.query;
    const filter: FilterQuery<ITask> = {};

    // Check if title is a string
    if (title && typeof title !== "string") {
      return res.status(400).json({ message: "Invalid title query parameter" });
    }

    // Check if completed is either "true" or "false"
    if (completed && completed !== "true" && completed !== "false") {
      return res
        .status(400)
        .json({ message: "Invalid completed query parameter" });
    }

    const tasks = await getTasks(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};

export const getTaskByIdHandler = async (req: Request, res: Response) => {
  try {
    const task = await getTaskById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error fetching task",
      error: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};

// Create a new task
export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({
      message: "Error creating task",
      error: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};

// Update a task by ID
export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const updatedTask = await updateTask(req.params.id, req.body);
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating task",
      error: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};

// Delete a task by ID
export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const deletedTask = await deleteTask(req.params.id);
    if (deletedTask) {
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error deleting task",
      error: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};

// Update the order of tasks
export const updateTasksOrderHandler = async (req: Request, res: Response) => {
  try {
    const { tasks } = req.body;
    const { title, completed } = req.query;
    const filter: FilterQuery<ITask> = {};

    // Check if title is a string
    if (title && typeof title !== "string") {
      return res.status(400).json({ message: "Invalid title query parameter" });
    }

    // Check if completed is either "true" or "false"
    if (completed && completed !== "true" && completed !== "false") {
      return res
        .status(400)
        .json({ message: "Invalid completed query parameter" });
    }

    const updatedTasks = await updateTasksOrder(tasks, filter);
    res.json(updatedTasks);
  } catch (err) {
    res.status(500).json({
      message: "Error updating tasks order",
      error: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};
