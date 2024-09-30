import axiosInstance from '../api/axios';
import { routes } from '../api/routes';
import { ConfigState } from '../store/reducers/config';

const { config } = routes;

const getBackendConfigRequest = async () => {
  const { data } = await axiosInstance.get<ConfigState>(config);
  return data;
};

export { getBackendConfigRequest };
