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
  user: UserState;
  search: SearchState;
}
