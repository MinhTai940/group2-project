import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  timeout: 5000
});

export default api;
