import axios from 'axios';

const baseURL = 'http://localhost:3000';
const commonInstance = axios.create({
  baseURL
});

commonInstance.interceptors.request.use(async (config) => {
  if (config.headers.common['auth-token'])
  {
    const [, payload] = config.headers.common['auth-token'].split('.');
    const payloadEncoded = JSON.parse(atob(payload));
    const accessTokenExpired = +new Date(payloadEncoded['exp'] * 1000) < Date.now();

    if (accessTokenExpired)
    {
      const response = await axios.post(
        `${baseURL}/auth/reftoken`,
        null,
        { withCredentials: true }
      );

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