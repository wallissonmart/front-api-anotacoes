import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-anotacoes.herokuapp.com',
});

export default api;
