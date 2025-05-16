import axios from './axios';

export const getTasksRequest = () => axios.get('/tasks');
export const getTaskRequest = (_id) => axios.get(`/task/${_id}`,);
export const getTasksUserRequest = (_id) => axios.get(`/tasks/user/${_id}`,);
export const createTaskRequest = (task) => axios.post('/tasks/store', task);
export const updateTaskRequest = (_id, task) => axios.put(`/tasks/update/${_id}`, task);
export const deleteTaskRequest = (id) => axios.delete(`/tasks/delete/${id}`);