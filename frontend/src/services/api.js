import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gestaodeeventosapi.onrender.com'
});

export default api;