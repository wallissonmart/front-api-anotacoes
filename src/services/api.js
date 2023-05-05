import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-15-228-199-7.sa-east-1.compute.amazonaws.com/api',
});

export default api;
