import axiosInstance from '../api/axios';
import { routes } from '../api/routes';
import { EntitySearchResult, GroupSearchResult } from '../lib/types';

const {
  backend: { history },
} = routes;

const mySearchHistory = async (): Promise<(EntitySearchResult | GroupSearchResult)[]> => {
  const { data } = await axiosInstance.get(history);
  return data;
};

const addSearchHistory = async ({ type, id }) => {
  const { data } = await axiosInstance.patch(history, { type, id });
  return data;
};

export { mySearchHistory, addSearchHistory };
