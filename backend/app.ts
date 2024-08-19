import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import {
  getTasksHandler,
  getTaskByIdHandler,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  updateTasksOrderHandler,
} from "./src/controllers/taskContrller";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define your routes here
app.get("/tasks", getTasksHandler);
app.get("/tasks/:id", getTaskByIdHandler);
app.post("/tasks", createTaskHandler);
app.put("/tasks/:id", updateTaskHandler);
app.delete("/tasks/:id", deleteTaskHandler);
app.put("/tasks", updateTasksOrderHandler);

export default app;
