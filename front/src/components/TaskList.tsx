import React from "react";
import { useAppSelector } from "../redux/hooks";
import Task from "./Task";

const TaskList: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  // Calculating task counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const notCompletedTasks = totalTasks - completedTasks;

  return (
    <div>
      <div className="mb-4">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Not Completed Tasks: {notCompletedTasks}</p>
      </div>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
