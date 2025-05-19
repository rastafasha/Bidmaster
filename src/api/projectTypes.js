import axios from './axios';

export const getProjectTypesRequest = () => axios.get('/projectTypes');
export const getProjectTypeRequest = (_id) => axios.get(`/projectType/${_id}`,);
export const getProjectTypesUserRequest = (_id) => axios.get(`/projectTypes/user/${_id}`,);
export const createProjectTypeRequest = (projectType) => axios.post('/projectTypes/store', projectType);
export const updateProjectTypeRequest = (_id, projectType) => axios.put(`/projectTypes/update/${_id}`, projectType);
export const deleteProjectTypeRequest = (id) => axios.delete(`/projectTypes/delete/${id}`);