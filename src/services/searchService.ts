import axiosInstance from '../api/axios';
import { routes } from '../api/routes';
import { ResultsTypes } from '../lib/enums';
import { Entity, Group } from '../lib/types';
import { EntitySearchResult, GroupSearchResult } from '../lib/types';

const {
  backend: { search, subs },
} = routes;

const getCountsBySearchTermRequest = async (searchTerm: string) => {
  const counts: Record<ResultsTypes, number> = { entity: 0, goalUser: 0, group: 0 };
  await Promise.allSettled(
    Object.values(ResultsTypes).map(async (type: ResultsTypes) => {
      const { headers } = await axiosInstance.get(`${search}?queryString=${searchTerm}&type=${type}&page=1&pageSize=1`);
      counts[type] = +headers['x-total-count'];
    }),
  );

  return counts;
};

const searchRequest = async (
  searchTerm: string,
  type: ResultsTypes,
  page: number,
  pageSize: number,
): Promise<EntitySearchResult[] | GroupSearchResult[]> => {
  const { data } = await axiosInstance.get(
    `${search}?queryString=${searchTerm}&type=${type}&page=${page}&pageSize=${pageSize}`,
  );
  return data;
};

const getSubsOfGroup = async ({ groupId }: { groupId: string }): Promise<{ entities: Entity[]; groups: Group[] }> => {
  const updateSubs = subs.replace(':id', groupId);

  const { data } = await axiosInstance.get(updateSubs);
  return data;
};

export { getCountsBySearchTermRequest, searchRequest, getSubsOfGroup };
