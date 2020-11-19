import axios from 'axios';
import Store from '@/store/index';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'auth-token': Store.getters['auth/accessToken']
  }
});

export default axiosInstance;