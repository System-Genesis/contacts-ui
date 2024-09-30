import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageState } from '../../i18n';

const initialState: Partial<LanguageState> = {};

export const languageSlice = createSlice({
  name: 'language',
  initialState: initialState as LanguageState,
  reducers: {
    setLanguage: (_state, action: PayloadAction<LanguageState>) => {
      return action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
