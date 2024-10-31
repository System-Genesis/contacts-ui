import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './reducers/user';
import searchReducer, { SearchState } from './reducers/search';
import drawerReducer, { DrawerState } from './reducers/drawer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    drawer: drawerReducer,
  },
});

export interface RootState {
  user: UserState;
  search: SearchState;
  drawer: DrawerState;
}
