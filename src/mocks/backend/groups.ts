import MockAdapter from 'axios-mock-adapter';
import { groupStub, groupsSearchStub, groupsUnderGroupStub, hierarchyTreeStub } from '../stubs/backend/groups';

const mockGroups = (mock: MockAdapter) => {
  mock.onGet('/api/kartoffel/groups/search').reply(() => [200, groupsSearchStub, { 'x-total-count': 105 }]);

  mock
    .onGet(new RegExp('/api/kartoffel/groups/*.*/children'))
    .reply(() => [200, groupsUnderGroupStub, { 'x-total-count': 105 }]);

  mock.onGet(new RegExp('/api/kartoffel/groups/tree')).reply(() => [200, hierarchyTreeStub]);

  mock.onGet(new RegExp('/api/kartoffel/groups/*.*')).reply(() => [200, groupStub]);
};

export { mockGroups };
