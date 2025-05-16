import axios from './axios';

// const API = 'http://localhost:4000/api'; // Replace with your actual API base URL

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verifyTokenRequest = () => axios.post(`/verify`);
export const logoutRequest = () => axios.post(`/logout`);