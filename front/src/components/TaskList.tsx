import React from "react";
import { useAppSelector } from "../redux/hooks";
import Task from "./Task";

const TaskList: React.FC = () => {
  const { tasks, status } = useAppSelector((state) => state.tasks);

  // Calculating task counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const notCompletedTasks = totalTasks - completedTasks;

  return (
    <div>
      {/* Will check the avilabilty of the tasks */}
      {tasks.length < 1 && status === "succeeded" && (
        <div className="text-center font-bold">Nothing found</div>
      )}
      {/* If it is available it will just display */}
      {tasks.length > 0 && (
        <>
          <div className="my-4 flex justify-between font-bold flex-col sm:flex-row">
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
            <p>Not Completed Tasks: {notCompletedTasks}</p>
          </div>
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </>
      )}
      {/* If it failed to fetch then it must be the backend */}
      {status === "failed" && (
        <div className="text-center font-bold">Please run the backend</div>
      )}
    </div>
  );
};

export default TaskList;
