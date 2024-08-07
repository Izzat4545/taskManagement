import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchTasks,
  addTask,
  setSearchQuery,
  setCompletedFilter,
} from "../redux/tasksSlice";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const searchQuery = useAppSelector((state) => state.tasks.searchQuery);
  const completedFilter = useAppSelector(
    (state) => state.tasks.completedFilter
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title) {
      dispatch(addTask({ title, completed: false }));
      setTitle("");
    }
  };

  useEffect(() => {
    dispatch(
      fetchTasks({
        title: searchQuery,
        completed: completedFilter,
      })
    );
  }, [dispatch, searchQuery, completedFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const completedValue = value === "all" ? undefined : value === "true";
    dispatch(setCompletedFilter(completedValue));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-control mb-4">
        <div className="input-group flex flex-col sm:flex-row gap-3 justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Task"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
      <div className="flex flex-col w-full md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search tasks by name"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="input input-bordered w-full mb-4"
        />
        <select
          className="select select-primary w-full"
          value={
            completedFilter === undefined ? "all" : completedFilter.toString()
          }
          onChange={handleFilterChange}
        >
          <option value="all">All Tasks</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskForm;
