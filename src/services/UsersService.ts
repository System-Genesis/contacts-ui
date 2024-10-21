import axiosInstance from '../api/axios';
import { routes } from '../api/routes';

const { users } = routes;

const getPic = async (id: string) => {
  const { data } = await axiosInstance.get(`${users}/pic/${id}`);
  return data;
};

export { getPic };
