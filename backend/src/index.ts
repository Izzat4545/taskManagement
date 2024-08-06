import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ITask } from './types/task'

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/taskmanager';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err: unknown) => {
    console.error('Failed to connect to MongoDB', err instanceof Error ? err.message : 'Unknown error');
  });

//Task model
const TaskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

// Created Express app
const app = express();
app.use(bodyParser.json());


// MY API ROUTES

// It will get all tasks
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.query;

    const filter: any = {};
    if (title) {
      filter.title = new RegExp(title as string, 'i');
    }
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching tasks',
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    });
  }
});

// it will get specific task
app.get('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching task',
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    });
  }
});

// To post a task title is REQUIRED
app.post('/tasks', async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({
      message: 'Error creating task',
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    });
  }
});

// TO DELETE TASK
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting task',
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    });
  }
});

// Update task by id
app.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      Object.assign(task, req.body);
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error updating task',
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
