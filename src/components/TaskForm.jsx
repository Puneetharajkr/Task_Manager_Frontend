import React, { useState } from 'react';
import { createTask } from '../services/api';

function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title) return alert('Title is required');
    await createTask(task);
    setTask({ title: '', description: '', due_date: '', status: 'Pending' });
    window.location.reload(); // reload list
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="due_date"
            className="form-control"
            value={task.due_date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
