import axios from './axios';

export const getProjectTypesRequest = () => axios.get('/typeprojects');
export const getProjectTypeRequest = (_id) => axios.get(`/typeprojects/${_id}`,);
export const getProjectTypesUserRequest = (_id) => axios.get(`/typeprojects/user/${_id}`,);
export const createProjectTypeRequest = (projectType) => axios.post('/typeprojects/store', projectType);
export const updateProjectTypeRequest = (_id, projectType) => axios.put(`/typeprojects/update/${_id}`, projectType);
export const deleteProjectTypeRequest = (id) => axios.delete(`/typeprojects/delete/${id}`);