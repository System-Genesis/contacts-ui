import axiosInstance from '../api/axios';
import { routes } from '../api/routes';
import { UserTypes } from '../lib/enums';
import { EntitySearchResult, GroupSearchResult } from '../lib/types';

const {
  backend: { pic, users },
} = routes;

const getPicByID = async (identifier: string): Promise<string> => {
  const getFormattedPicture = (image: string) =>
    image.startsWith('/9j/') ? image : Buffer.from(image, 'base64').toString('utf-8');
  const { data }: { data: string } = await axiosInstance.get(`${pic}/${identifier}`);

  return `data:image/jpeg;base64,${getFormattedPicture(data)}`;
};

const editUser = async (id: string, data: any) => {
  const { data: resData } = await axiosInstance.patch(`${users}/${id}`, data);
  return resData;
};

const getUserById = async ({
  id,
  type,
}: {
  id: string;
  type: UserTypes;
}): Promise<GroupSearchResult | EntitySearchResult> => {
  const { data: user } = await axiosInstance.get(`${users}/${id}`, { params: { type } });
  return user;
};

export { getPicByID, editUser, getUserById };
