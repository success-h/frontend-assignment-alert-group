import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { deleteCookie, getCookie } from 'cookies-next';
import { BusinessReducerState } from '@/types/types';

// Remove redundant Profile type definition

const initialState: BusinessReducerState = {
  user: null,
  business_details: null,
  account_type: null,
};

const persistConfig = {
  key: 'info',
  storage,
};

const authSlice = createSlice({
  name: 'business_details',
  initialState,
  reducers: {
    setBusinessDetails: (state, action) => {
      state.business_details = action.payload;
    },
    setAccountType: (state, action) => {
      state.account_type = action.payload;
    },
    clearAccountType: (state) => {
      state.account_type = null;
    },

    resetAuthState: () => initialState,
  },
});

export const { setBusinessDetails, setAccountType, clearAccountType } =
  authSlice.actions;
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
export default persistedAuthReducer;
export const selectBusinessDetails = (state: RootState) =>
  state.info.business_details;

export const selectAccountType = (state: RootState) => state.info.account_type;

export const resetPersistedAuthState = (): AppThunk => (dispatch) => {
  dispatch({ type: 'persist/REHYDRATE', key: 'info', payload: {} });
};
