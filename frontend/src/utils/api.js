import axios from 'axios';

const api = axios.create({
  baseURL: 'https://paws-connect-backend-12345-01e7abe8ef59.herokuapp.com/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
