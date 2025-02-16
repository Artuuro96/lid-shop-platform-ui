import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../interfaces/inital-state.interface";
import { getToken } from "../utils/token";
import { Sale } from "../interfaces/sale.interface";

const { VITE_LID_SHOP_API_BASE_URL } = import.meta.env;

const initialState: InitialState<Sale[]> = {
  data: [], 
  error: null,
  loading: false,
}

const saleSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    fetchSalesStart(state) {
      state.loading = true;
    },
    fetchSalesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchSalesSuccess(state, action: PayloadAction<Sale[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    postSalesSuccess(state, action: PayloadAction<Sale>) {
      state.data.push(action.payload);
      state.loading = false;
    },
    postSalesStart(state) {
      state.loading = false;
    },
    postSalesFailure(state, action: PayloadAction<Sale>) {
      state.data.push(action.payload);
      state.loading = false;
    },
  }
});

export const {
  fetchSalesStart,
  fetchSalesFailure,
  fetchSalesSuccess,
  postSalesStart,
  postSalesSuccess,
  postSalesFailure,
} = saleSlice.actions;

export const fetchClients = () => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/sales`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: fetchSalesSuccess.type,
    onStart: fetchSalesStart.type,
    onError: fetchSalesFailure.type,
  }
});

export const postSale = (sale: Sale) => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/sales`,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    data: sale,
    onSuccess: postSalesSuccess.type,
    onStart: postSalesStart.type,
    onError: postSale
  },
  
})

export default saleSlice.reducer;