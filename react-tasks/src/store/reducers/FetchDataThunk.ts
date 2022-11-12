import { createAsyncThunk } from '@reduxjs/toolkit';
import { photosSearch } from 'api/flickr';

export const fetchPhotos = createAsyncThunk('user/fetchAll', async (text: string, thunkAPI) => {
  try {
    const response = await photosSearch(text);
    return response.photos.photo;
  } catch (e) {
    return thunkAPI.rejectWithValue('Error loading data');
  }
});
