import MockAdapter from 'axios-mock-adapter';
import { entitiesUnderHierarchyStub, entityByRoleStub } from '../stubs/backend/entities';

const mockEntities = (mock: MockAdapter) => {
  mock.onGet(new RegExp('/api/kartoffel/entities/role/*.*')).reply(() => [200, entityByRoleStub]);

  mock.onGet(new RegExp('/api/kartoffel/entities/hierarchy/*.*')).reply(() => [
    200,
    entitiesUnderHierarchyStub.slice(0, 10),
    // entitiesUnderHierarchyStub,
    {
      'x-total-count': 20,
    },
  ]);

  mock.onGet(new RegExp('/api/kartoffel/entities/identifier/*.*')).reply(() => [200, entitiesUnderHierarchyStub[0]]);
  mock.onGet(new RegExp('/api/kartoffel/entities/search')).reply(() => [200, entitiesUnderHierarchyStub.slice(0, 10)]);
};

export { mockEntities };
