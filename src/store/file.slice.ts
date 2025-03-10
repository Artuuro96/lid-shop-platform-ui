import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState } from '../interfaces/inital-state.interface';
import { getToken } from '../utils/token';
const { VITE_LID_SHOP_API_BASE_URL } = import.meta.env;

const initialState: InitialState<{ url: string | null }> = {
  data: { url: null },
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    postFileStart(state) {
      state.loading = true;
    },
    postFileSuccess(state, action: PayloadAction<{ url: string }>) {
      state.data.url = action.payload.url;
      state.loading = false;
    },
    postFileFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false
    }
  },
});

export const { 
  postFileSuccess,
  postFileFailure,
  postFileStart,
} = fileSlice.actions;

export const postFile = (img: FormData, headers: { [key: string]: string }) => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/articles/image`,
    method: 'POST',
    data: img,
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: postFileSuccess.type,
    onStart: postFileFailure.type,
    onError: postFileStart.type,
  },
}); 

export default fileSlice.reducer;
