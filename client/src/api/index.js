import axios from 'axios';
import Store from '../store/index';

const commonInstance = axios.create({
  baseURL: 'http://localhost:3000'
});
const authInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

commonInstance.interceptors.request.use(async (config) => {
  if (config.headers.common['auth-token'])
  {
    const [, payload] = config.headers.common['auth-token'].split('.');
    const payloadEncoded = JSON.parse(atob(payload));
    const isExpired = +new Date(payloadEncoded['exp'] * 1000) < Date.now();
    console.log('payloadEncoded', payloadEncoded);
    console.log('payloadEncoded', new Date(payloadEncoded['exp'] * 1000));

    if (isExpired)
    {
      const response = await authInstance.post('/auth/reftoken', null, { withCredentials: true });

      if (response.data.success)
      {
        localStorage['auth-token'] = response.data.accessToken;
        config.headers.common['auth-token'] = response.data.accessToken;
      }
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default commonInstance;