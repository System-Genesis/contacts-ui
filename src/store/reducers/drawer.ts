import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntitySearchResult, GroupSearchResult } from '../../lib/types';

export interface DrawerState {
  isOpen: boolean;
  contact: GroupSearchResult | EntitySearchResult | null;
}

const initialState: DrawerState = {
  isOpen: false,
  contact: null,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
      if (!action.payload) state.contact = null;
    },
    setDrawerObject: (state, action: PayloadAction<GroupSearchResult | EntitySearchResult>) => {
      state.contact = action.payload;
    },
  },
});

export const { setIsDrawerOpen, setDrawerObject } = drawerSlice.actions;
export default drawerSlice.reducer;
