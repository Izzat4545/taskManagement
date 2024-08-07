import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Task from "./Task";
import { reorderTasks } from "../redux/tasksSlice";

const TaskList: React.FC = () => {
  const { tasks, status } = useAppSelector((state) => state.tasks);
  // saving the tasks in taskList to make it dynamic when I change the order
  const [taskList, setTaskList] = useState(tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTaskList(tasks);
    console.log(tasks);
  }, [tasks]);

  // This could be a problem
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const notCompletedTasks = totalTasks - completedTasks;

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    // ONCE THE TASK HAS BEEN DROPPED IT WILL SYNCRONIZE THE SERVER WITH THE CURRENT ORDER
    const draggedIndex = e.dataTransfer.getData("draggedIndex");
    if (draggedIndex === null) return;

    const newTaskList = [...taskList];
    const [draggedTask] = newTaskList.splice(parseInt(draggedIndex), 1);
    newTaskList.splice(dropIndex, 0, draggedTask);
    setTaskList(newTaskList);

    dispatch(reorderTasks(newTaskList));
  };
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
          {/* just a simple drag and drop */}
          {taskList.map((task, index) => (
            <div
              key={task._id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
            >
              <Task task={task} />
            </div>
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
