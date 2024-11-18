import axiosInstance from '../api/axios';
import { routes } from '../api/routes';
import { Tag } from '../lib/types';

const {
  backend: { tags },
} = routes;

const getTags = async (): Promise<Tag[]> => {
  const { data } = await axiosInstance.get(`${tags}`);
  return data;
};

const searchTags = async (searchTerm: string): Promise<Tag[]> => {
  const { data } = await axiosInstance.get(`${tags}/search?name=${searchTerm}`);
  return data;
};

const createTag = async (name: string): Promise<void> => {
  await axiosInstance.post(`${tags}`, name);
};

export { createTag, searchTags, getTags };
