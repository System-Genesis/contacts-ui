import axiosInstance from '../api/axios';
import { routes } from '../api/routes';

const {
  backend: { favorites },
} = routes;

const getMyFavoritesRequest = async () => {
  const { data } = await axiosInstance.get(favorites);
  return data;
};

const addFavoriteRequest = async ({ type, id }) => {
  const { data } = await axiosInstance.patch(favorites, { type, id });
  return data;
};

const removeFavoriteRequest = async ({ id }) => {
  const { data } = await axiosInstance.delete(favorites, { data: { id } });
  return data;
};

export { getMyFavoritesRequest, addFavoriteRequest, removeFavoriteRequest };
