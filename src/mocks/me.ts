import MockAdapter from 'axios-mock-adapter';
import {
  // loggedInEntityStubExternal,
  loggedInEntityStubEs,
  // loggedInEntityStubGoalUser,
} from './stubs/backend/entities';

const mockMe = (mock: MockAdapter) => {
  mock.onGet('/api/me').reply(() => [200, loggedInEntityStubEs]);
  mock.onGet('/api/auth/me').reply(() => [200, loggedInEntityStubEs]);
};

export { mockMe };
