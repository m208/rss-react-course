import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from 'components/FormsPage/FormsPage';

interface FormsState {
  forms: Array<IFormData>;
}

const initialState: FormsState = {
  forms: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForms(state, action: PayloadAction<Array<IFormData>>) {
      state.forms = [...state.forms, ...action.payload];
    },
  },
});

export default formsSlice.reducer;
