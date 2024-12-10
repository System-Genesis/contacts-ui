import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  hiChatUrl: string;
  jabberUrl: string;
  serviceNowUrl: string;
  resetTimeoutActions: string[];
  resetTimeout: number;
  matomoUrl: string;
  matomoSiteID: number;
}

const initialState: Partial<ConfigState> = {};

export const configSlice = createSlice({
  name: 'config',
  initialState: initialState as ConfigState,
  reducers: {
    setConfig: (_state, action: PayloadAction<ConfigState>) => {
      return action.payload;
    },
  },
});

export const { setConfig } = configSlice.actions;

export default configSlice.reducer;
