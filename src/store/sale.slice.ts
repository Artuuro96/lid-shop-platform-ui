import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../interfaces/inital-state.interface";
import { getToken } from "../utils/token";
import { Sale } from "../interfaces/sale.interface";
import { SaleDetail } from "../interfaces/sale-detail.interface";

const { VITE_LID_SHOP_API_BASE_URL } = import.meta.env;

const initialState: InitialState<SaleDetail[]> = {
  data: [], 
  error: null,
  loading: false,
}

const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    fetchSalesStart(state) {
      state.loading = true;
    },
    fetchSalesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchSalesSuccess(state, action: PayloadAction<SaleDetail[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    postSalesSuccess(state, action: PayloadAction<SaleDetail>) {
      state.data.push(action.payload);
      state.loading = false;
    },
    postSalesStart(state) {
      state.loading = true;
    },
    postSalesFailure(state, action: PayloadAction<SaleDetail>) {
      state.data.push(action.payload);
      state.loading = false;
    },
    deleteSalesSuccess(state, action: PayloadAction<{ deletedIds: string[] }>) {
      const filteredSales = state.data.filter(sale => !action.payload.deletedIds.includes(sale._id));
      state.data = filteredSales;
      state.loading = false;
    },
    deleteSalesStart(state) {
      state.loading = true;
    },
    deleteSalesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
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
  deleteSalesStart,
  deleteSalesSuccess,
  deleteSalesFailure,
} = saleSlice.actions;

export const fetchSales = () => ({
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
    onError: postSalesFailure.type,
  },
});

export const deleteSalesById = (saleIds: string[]) => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/sales/?sale_ids=${saleIds?.join('&article_ids=')}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: deleteSalesSuccess.type,
    onStart: deleteSalesStart.type,
    onError: deleteSalesFailure.type,
  },
});

export default saleSlice.reducer;