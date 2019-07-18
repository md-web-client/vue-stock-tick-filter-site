import axios from 'axios';
import interceptors from './AxiosInterceptors';

export default (uri) => {
  const api = axios.create({
    baseURL : uri,
  });
  api.interceptors.response.use(interceptors.success, interceptors.error);
  return api;
};

