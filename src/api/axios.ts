import { environment } from './../globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthService } from '../services/authService';

const env = import.meta.env;

console.log(env);

const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 1800000,
  baseURL: env.DEV && env.VITE_APP_BE ? environment.devBackendURL : '',
});

axiosInstance.interceptors.request.use((config) => {
  // console.log(`[${method?.toUpperCase()}] ${url}`);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthService.logout();
    }

    return Promise.reject(error);
  },
);

if (env.DEV && !env.VITE_APP_BE) {
  console.log('Development Environment, using axios mock');

  const [{ mockEntities }, { mockGroups }, { mockMe }] =
    await Promise.all([
      import('../mocks/backend/entities'),
      import('../mocks/backend/groups'),
      import('../mocks/me'),
    ]);

  const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

  mockGroups(mock);
  mockEntities(mock);
  mockMe(mock);
}

export default axiosInstance;
