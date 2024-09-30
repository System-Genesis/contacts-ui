import MockAdapter from 'axios-mock-adapter';
import { entitiesUnderHierarchyStub } from '../stubs/backend/entities';
import { ResultsTypes } from '../../lib/enums';

const mockSearch = (mock: MockAdapter) => {
  mock.onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.ENTITY}&page=1&pageSize=1`)).reply(() => [
    200,
    entitiesUnderHierarchyStub.slice(0, 1),
    {
      'x-total-count': 69,
    },
  ]);

  mock.onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.GROUP}&page=1&pageSize=1`)).reply(() => [
    200,
    entitiesUnderHierarchyStub.slice(0, 1),
    {
      'x-total-count': 12,
    },
  ]);

  mock.onGet(new RegExp(`/api/search/*.*?type=${ResultsTypes.GOAL_USER}&page=1&pageSize=1`)).reply(() => [
    200,
    entitiesUnderHierarchyStub.slice(0, 1),
    {
      'x-total-count': 33,
    },
  ]);
};

export { mockSearch };
