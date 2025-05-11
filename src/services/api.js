import axios from 'axios';

const API_URL = 'https://task-manager-backend-9xgx.onrender.com/api/tasks';

export const getTasks = (search = '') =>
  axios.get(`${API_URL}?search=${search}`);

export const getTaskById = (id) => axios.get(`${API_URL}/${id}`);

export const createTask = (task) => axios.post(API_URL, task);

export const updateTask = (id, task) =>
    axios.put(`${API_URL}/${id}`, {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
    });

  

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

export const deleteAllTasks = () => axios.delete(API_URL);
