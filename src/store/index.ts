import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './reducers/user';
import searchReducer, { SearchState } from './reducers/search';
import drawerReducer, { DrawerState } from './reducers/drawer';
import configReducer, { ConfigState } from './reducers/config';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    drawer: drawerReducer,
    config: configReducer,
  },
});

export interface RootState {
  user: UserState;
  search: SearchState;
  drawer: DrawerState;
  config: ConfigState;
}
