import React, { useEffect, useState } from 'react';
import { getTasks, deleteAllTasks } from '../services/api';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleReset = async () => {
    const confirmReset = window.confirm('Are you sure you want to delete all tasks?');
    if (!confirmReset) return;

    try {
      await deleteAllTasks();
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete all tasks:', error);
      alert('Something went wrong while deleting all tasks.');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Task List</h4>
        {tasks.length > 0 && (
          <button className="btn btn-danger btn-sm" onClick={handleReset}>
            Reset All
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <p className="text-center">No tasks found</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
