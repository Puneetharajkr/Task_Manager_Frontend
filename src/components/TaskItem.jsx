import React, { useState } from 'react';
import { deleteTask, updateTask } from '../services/api';
import './taskItem.css'



function TaskItem({ task, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleDelete = async () => {
    await deleteTask(task.id);
    onUpdate();
  };

  const handleUpdate = async () => {
    const { title, description, due_date, status } = updatedTask;

    // ✅ Validate required fields
    if (!title || !description || !due_date || !status) {
      alert('Please fill all fields: title, description, due date, status');
      return;
    }

    try {
      await updateTask(task.id, {
        title,
        description,
        due_date,
        status,
      });
      setEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      alert('Failed to update task. Please try again.');
    }
  };

  return (
    <li className="list-group-item bg-color">
      {editing ? (
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              value={updatedTask.title}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, title: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              value={updatedTask.description}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, description: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={updatedTask.due_date || ''}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, due_date: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={updatedTask.status}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, status: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="col-md-2 d-flex gap-2">
            <button onClick={handleUpdate} className="btn btn-success w-50">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="btn btn-secondary w-50">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6>{task.title}</h6>
            <small>{task.description}</small>
            <br />
            <span className="badge bg-info me-2">{task.status}</span>
            <small className="text-muted">Due Date: {task.due_date || 'N/A'}</small>

          </div>
          <div>
            <button
              onClick={() => setEditing(true)}
              className="btn btn-sm btn-outline-primary me-2"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-sm btn-outline-danger">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;

