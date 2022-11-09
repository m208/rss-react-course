import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FlickrSearchItem } from 'api/types';

interface SearchState {
  spinnerActive: boolean;
  modalActive: boolean;
  searchResults: Array<FlickrSearchItem>;
  modalContent: FlickrSearchItem | null;
}

const initialState: SearchState = {
  spinnerActive: false,
  modalActive: false,
  searchResults: [],
  modalContent: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleSpinner(state, action: PayloadAction<boolean>) {
      state.spinnerActive = action.payload;
    },

    toggleModal(state, action: PayloadAction<boolean>) {
      state.modalActive = action.payload;
    },

    setCards(state, action: PayloadAction<Array<FlickrSearchItem>>) {
      state.searchResults = [...state.searchResults, ...action.payload];
    },

    setModalContent(state, action: PayloadAction<FlickrSearchItem | null>) {
      state.modalContent = action.payload;
    },
  },
});

export default searchSlice.reducer;
