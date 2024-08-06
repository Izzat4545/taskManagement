import React, { useState } from "react";
import { Task as TaskType } from "../types/tasks";
import { useAppDispatch } from "../redux/hooks";
import { updateTask, deleteTask } from "../redux/tasksSlice";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleToggleCompleted = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleUpdate = () => {
    if (editedTitle.trim() !== "") {
      dispatch(updateTask({ ...task, title: editedTitle }));
      setIsEditing(false);
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl m-2">
      <div className="flex flex-col justify-between p-5">
        {isEditing ? (
          <div className="flex items-center">
            <input
              type="text"
              className="input input-bordered w-full"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <button className="btn btn-primary ml-2" onClick={handleUpdate}>
              Update
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <h2 className={`card-title ${task.completed ? "line-through" : ""}`}>
            {task.title}
          </h2>
        )}
        <div className="card-actions justify-end">
          {!isEditing && (
            <>
              <button
                className="btn btn-primary btn-sm md:btn-md"
                onClick={handleToggleCompleted}
              >
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                className="btn btn-secondary btn-sm md:btn-md"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn btn-info btn-sm md:btn-md"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
