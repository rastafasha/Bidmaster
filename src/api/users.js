import axios from './axios';

export const getUsersRequest = () => axios.get('/users');
export const getUserRequest = (_id) => axios.get(`/user/${_id}`,);
export const updateUserRequest = (_id, user) => axios.put(`/users/update/${_id}`, user);
export const deleteUserRequest = (id) => axios.delete(`/users/delete/${id}`);