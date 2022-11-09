import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/SearchSlice';
import formsReducer from './reducers/FormsSlice';

const rootReducer = combineReducers({
  searchReducer,
  formsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
