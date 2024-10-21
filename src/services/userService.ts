import axiosInstance from '../api/axios';
import { routes } from '../api/routes';

const {
  backend: { pic },
} = routes;

const getPicByID = async ({ id }: { id: string }): Promise<string> => {
  const getFormattedPicture = (image: string) =>
    image.startsWith('/9j/') ? image : Buffer.from(image, 'base64').toString('utf-8');
  const { data }: { data: string } = await axiosInstance.get(`${pic}/${id}`);

  return `data:image/jpeg;base64,${getFormattedPicture(data)}`;
};

export { getPicByID };
