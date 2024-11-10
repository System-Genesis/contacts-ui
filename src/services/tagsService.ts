import axiosInstance from '../api/axios';
import { routes } from '../api/routes';

const {
  backend: { pic, users },
} = routes;

const getPicByID = async ({ id }: { id: string }): Promise<string> => {
  const getFormattedPicture = (image: string) =>
    image.startsWith('/9j/') ? image : Buffer.from(image, 'base64').toString('utf-8');
  const { data }: { data: string } = await axiosInstance.get(`${pic}/${id}`);

  return `data:image/jpeg;base64,${getFormattedPicture(data)}`;
};

const editUser = async (id: string, data: any) => {
  const { data: resData } = await axiosInstance.patch(`${users}/${id}`, data);
  return resData;
};

export { getPicByID, editUser };
