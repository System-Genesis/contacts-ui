import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
export interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: '',
};

// Create a slice of the store
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

// Export the action and reducer
export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
