import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FlickrSearchItem } from 'api/types';
import { fetchPhotos } from './FetchDataThunk';

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
    toggleModal(state, action: PayloadAction<boolean>) {
      state.modalActive = action.payload;
    },

    setModalContent(state, action: PayloadAction<FlickrSearchItem | null>) {
      state.modalContent = action.payload;
    },
  },

  extraReducers: {
    [fetchPhotos.fulfilled.type]: (state, action: PayloadAction<Array<FlickrSearchItem>>) => {
      state.spinnerActive = false;
      state.searchResults = [...state.searchResults, ...action.payload];
    },
    [fetchPhotos.pending.type]: (state) => {
      state.spinnerActive = true;
    },
    [fetchPhotos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.spinnerActive = false;
      console.error(action.payload);
    },
  },
});

export default searchSlice.reducer;
