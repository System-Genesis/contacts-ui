import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntitySearchResult, GroupSearchResult } from '../../lib/types';
import { ResultsTypes } from '../../lib/enums';
import { UserState } from './user';
import i18next from 'i18next';

import {
  jabberPhoneValidation,
  mailValidation,
  mobilePhoneValidation,
  otherPhoneValidation,
  redPhoneValidation,
  tagsValidation,
} from '../../utils/utils';

export interface DrawerState {
  isOpen: boolean;
  contact: GroupSearchResult | EntitySearchResult | UserState | undefined;
  subEntity: EntitySearchResult | undefined;
  prevGroups: GroupSearchResult[];
  isEdit: boolean;
  validationError: Record<string, { isError: boolean; errorMessage: string }>;
}

const initialState: DrawerState = {
  isOpen: false,
  contact: undefined,
  subEntity: undefined,
  prevGroups: [] as GroupSearchResult[],
  isEdit: false,
  validationError: {},
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
      state.validationError = {};
    },
    validateForm: (state, action: PayloadAction<{ field: string; value; required: boolean }>): void => {
      const { field, value, required } = action.payload;

      const formValidations: Record<string, (value) => boolean> = {
        mobilePhone: mobilePhoneValidation,
        jabberPhone: jabberPhoneValidation,
        redPhone: redPhoneValidation,
        otherPhone: otherPhoneValidation,
        mail: mailValidation,
        tags: tagsValidation,
      };
      const validationFn = formValidations[field];

      if (!value || value === '') {
        if (required)
          state.validationError[field] = { isError: true, errorMessage: i18next.t(`validationError.${field}Empty`) };
        else delete state.validationError[field];
      } else if (validationFn && !validationFn(value))
        state.validationError[field] = { isError: true, errorMessage: i18next.t(`validationError.${field}`) };
      else delete state.validationError[field];
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
