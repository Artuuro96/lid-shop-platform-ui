import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../interfaces/inital-state.interface';
import { Brand } from '../interfaces/brand.interface';
import { getToken } from '../utils/token';

const initialState: InitialState<Brand[]> = {
  data: [],
  loading: false,
  error: null,
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    fetchBrandsStart(state) {
      state.loading = true;
    },
    fetchBrandsSuccess(state, action: PayloadAction<Brand[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchBrandsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    postBrandStart(state) {
      state.loading = true;
    },
    postBrandSuccess(state, action: PayloadAction<Brand>) {
      state.data.push(action.payload);
      state.loading = false;
    },
    postBrandFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  fetchBrandsStart, 
  fetchBrandsSuccess, 
  fetchBrandsFailure,
  postBrandFailure,
  postBrandStart,
  postBrandSuccess,
} = brandSlice.actions;

export const fetchBrands = () => ({
  type: 'api/call',
  payload: {
    url: 'http://localhost:8000/brands',
    method: 'GET',
    headers: {
      Authorization: 'Bearer '  + getToken(),
    },
    onSuccess: fetchBrandsSuccess.type,
    onStart: fetchBrandsStart.type,
    onError: fetchBrandsFailure.type,
  },
});

export const postBrand = (brand: Brand) => ({
  type: 'api/call',
  payload: {
    url: 'http://localhost:8000/brands',
    method: 'POST',
    data: brand,
    headers: {
      Authorization: 'Bearer '  + getToken(),
    },
    onSuccess: postBrandSuccess.type,
    onStart: postBrandStart.type,
    onError: postBrandFailure.type,
  },
});

export default brandSlice.reducer;
