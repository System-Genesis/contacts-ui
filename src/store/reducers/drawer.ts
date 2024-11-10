import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntitySearchResult, GroupSearchResult, Entity } from '../../lib/types';
import { ResultsTypes } from '../../lib/enums';

export interface DrawerState {
  isOpen: boolean;
  contact: GroupSearchResult | EntitySearchResult | undefined;
  subEntity: Entity | undefined;
  subGroups: GroupSearchResult[];
}

const initialState: DrawerState = {
  isOpen: false,
  contact: undefined,
  subEntity: undefined,
  subGroups: [] as GroupSearchResult[],
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
      if (!action.payload) {
        state.contact = undefined;
        state.subEntity = undefined;
        state.subGroups = [] as GroupSearchResult[];
      }
    },
    setDrawerObject: (state, action: PayloadAction<GroupSearchResult | EntitySearchResult>) => {
      console.log({ action });

      state.contact = action.payload;
    },
    openSubEntity: (state, action: PayloadAction<Entity>) => {
      state.subEntity = action.payload;
    },
    openSubGroup: (state, action: PayloadAction<GroupSearchResult>) => {
      state.subGroups.push(state.contact);
      state.contact = { ...action.payload, type: ResultsTypes.GROUP };
      console.log({ subGroup: action.payload, subGroups: state.subGroups });
    },
    closeSubGroup: (state) => {
      state.contact = state.subGroups.pop();
    },
  },
});

export const { setIsDrawerOpen, setDrawerObject, openSubEntity, openSubGroup, closeSubGroup } = drawerSlice.actions;
export default drawerSlice.reducer;
