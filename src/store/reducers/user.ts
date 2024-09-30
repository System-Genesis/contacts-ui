import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleHistory } from '../../lib/types';

export interface UserState {
  id: string;
  adfsId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  source: string;
  rank: string;
  entityType: string;
  userType: string;
  permissions: { type: string }[];
  roleHistory: Partial<RoleHistory>[];
  digitalIdentities: any[];
  directGroup: string;
  hierarchy: string;
  fullName: string;
}

const initialState: Partial<UserState> = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {
    setUser: (_state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
