import axios from './axios';

export const getProjectsRequest = () => axios.get('/projects');
export const getProjectRequest = (_id) => axios.get(`/project/${_id}`,);
export const getProjectsUserRequest = (_id) => axios.get(`/projects/user/${_id}`,);
export const createProjectRequest = (project) => axios.post('/projects/store', project);
export const updateProjectRequest = (_id, project) => axios.put(`/projects/update/${_id}`, project);
export const deleteProjectRequest = (id) => axios.delete(`/projects/delete/${id}`);