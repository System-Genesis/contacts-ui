import axiosInstance from '../api/axios';
import { routes } from '../api/routes';
import { ResultsTypes } from '../lib/enums';

const { backend } = routes;

const getCountsBySearchTerm = async (searchTerm: string) => {
  const counts: Record<ResultsTypes, number> = { entity: 0, goalUser: 0, group: 0 };
  await Promise.allSettled(
    Object.values(ResultsTypes).map(async (type: ResultsTypes) => {
      const { headers } = await axiosInstance.get(`${backend}/search/${searchTerm}?type=${type}&page=1&pageSize=1`);
      counts[type] = +headers['x-total-count'];
    }),
  );

  return counts;
};

export { getCountsBySearchTerm };
