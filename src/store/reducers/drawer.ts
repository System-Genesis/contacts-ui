import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntitySearchResult, GroupSearchResult, Entity } from '../../lib/types';
import { ResultsTypes } from '../../lib/enums';
import { UserState } from './user';
import {
  jabberPhoneValidation,
  mailValidation,
  mobilePhoneValidation,
  otherPhoneValidation,
  redPhoneValidation,
} from '../../utils/utils';

export interface DrawerState {
  isOpen: boolean;
  contact: GroupSearchResult | EntitySearchResult | UserState | undefined;
  subEntity: EntitySearchResult | undefined;
  prevGroups: GroupSearchResult[];
  isEdit: boolean;
  isError: boolean;
}

const initialState: DrawerState = {
  isOpen: false,
  contact: undefined,
  subEntity: undefined,
  prevGroups: [] as GroupSearchResult[],
  isEdit: false,
  isError: false,
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
        state.prevGroups = [] as GroupSearchResult[];
      }
    },
    closeSubEntity: (state) => {
      state.subEntity = undefined;
    },
    setDrawerObject: (state, action: PayloadAction<GroupSearchResult | EntitySearchResult | UserState>) => {
      state.contact = action.payload;
      state.subEntity = undefined;
      state.prevGroups = [] as GroupSearchResult[];
    },
    openSubEntity: (state, action: PayloadAction<EntitySearchResult>) => {
      state.subEntity = action.payload;
    },
    openSubGroup: (state, action: PayloadAction<GroupSearchResult>) => {
      state.prevGroups.push(state.contact);
      state.subEntity = undefined;
      state.contact = { ...action.payload, type: ResultsTypes.GROUP };
    },
    closeSubGroup: (state) => {
      state.contact = state.prevGroups.pop();
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    validateForm: (state, action: PayloadAction<FormData>) => {
      const formValidations = {
        mobilePhone: mobilePhoneValidation,
        jabberPhone: jabberPhoneValidation,
        redPhone: redPhoneValidation,
        otherPhone: otherPhoneValidation,
        mail: mailValidation,
      };
      state.isError = true;
    },
  },
});

export const {
  setIsDrawerOpen,
  setDrawerObject,
  openSubEntity,
  openSubGroup,
  closeSubGroup,
  closeSubEntity,
  setIsEdit,
  validateForm,
} = drawerSlice.actions;
export default drawerSlice.reducer;
