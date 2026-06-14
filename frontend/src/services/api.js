import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:3000'
  baseURL: 'https://gestaodeeventosapi.onrender.com'
});

// Esse "interceptador" roda antes de QUALQUER requisição sair do frontend
api.interceptors.request.use(async config => {
  const token = localStorage.getItem('@GestaoEventos:token');

  if (token) {
    // Anexa o token no formato "Bearer <TOKEN>" que o nosso backend espera!
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;