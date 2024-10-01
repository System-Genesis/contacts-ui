import MockAdapter from 'axios-mock-adapter';
import { entitiesBySearch, entitiesUnderHierarchyStub } from '../stubs/backend/entities';
import { ResultsTypes } from '../../lib/enums';
import { groupsBySearchStub, groupsSearchStub } from '../stubs/backend/groups';
const env = import.meta.env;

const mockSearch = (mock: MockAdapter) => {
  mock.onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.ENTITY}&page=1&pageSize=1$`)).reply(() => [
    200,
    entitiesUnderHierarchyStub.slice(0, 1),
    {
      'x-total-count': 69,
    },
  ]);

  mock.onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.GROUP}&page=1&pageSize=1$`)).reply(() => [
    200,
    groupsSearchStub.slice(0, 1),
    {
      'x-total-count': 12,
    },
  ]);

  mock.onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.GOAL_USER}&page=1&pageSize=1$`)).reply(() => [
    200,
    entitiesUnderHierarchyStub.slice(0, 1),
    {
      'x-total-count': 33,
    },
  ]);

  mock
    .onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.ENTITY}&page=(1|2)&pageSize=${env.VITE_BACKEND_PAGE_SIZE}$`))
    .reply(() => [
      200,
      entitiesBySearch.slice(0, +env.VITE_BACKEND_PAGE_SIZE),
      {
        'x-total-count': 33,
      },
    ]);

  mock
    .onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.GROUP}&page=1&pageSize=${env.VITE_BACKEND_PAGE_SIZE}$`))
    .reply(() => [
      200,
      groupsBySearchStub.slice(0, +env.VITE_BACKEND_PAGE_SIZE),
      {
        'x-total-count': 33,
      },
    ]);

  mock
    .onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.GOAL_USER}&page=1&pageSize=${env.VITE_BACKEND_PAGE_SIZE}$`))
    .reply(() => [
      200,
      entitiesBySearch.slice(0, +env.VITE_BACKEND_PAGE_SIZE),
      {
        'x-total-count': 33,
      },
    ]);
};

export { mockSearch };
