import axios from 'axios';
import Store from '@/store/index';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'auth-token': Store.getters['auth/accessToken']
  }
});

axiosInstance.interceptors.response.use(function (config) {
  const payload = Store.getters['auth/accessToken'].split('.')[1];
  const payloadEncoded = atob(payload);

  console.log('payloadEncoded', new Date(payloadEncoded.ext * 1000));

  return config;
}, function (error) {
  console.log('1111')

  return Promise.reject(error);
});

export default axiosInstance;