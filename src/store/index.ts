import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './reducers/user';
import searchReducer, { SearchState } from './reducers/search';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

export interface RootState {
  user: UserState; // Import and use the UserState type if necessary
  search: SearchState; // Import and use the SearchState type
}
