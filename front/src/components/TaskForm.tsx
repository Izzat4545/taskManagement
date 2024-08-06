import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchTasks, addTask } from "../redux/tasksSlice";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedFilter, setCompletedFilter] = useState<string | undefined>(
    undefined
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
        completed:
          completedFilter === "true" ||
          (completedFilter === undefined && undefined),
      })
    );
  }, [dispatch, searchQuery, completedFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCompletedFilter(value === "all" ? undefined : value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-control mb-4">
        <div className="input-group flex gap-3 justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Task"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn  btn-primary">
            Add Task
          </button>
        </div>
      </form>
      <div className="flex flex-col w-full md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search tasks by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full mb-4"
        />

        <select
          className="select select-primary w-full max-w-xs"
          value={completedFilter}
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
