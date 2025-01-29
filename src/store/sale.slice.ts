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

const clientSlice = createSlice({
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
  }
});

export const {
  fetchSalesStart,
  fetchSalesFailure,
  fetchSalesSuccess,
} = clientSlice.actions;

export const fetchClients = () => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/clients`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: fetchSalesSuccess.type,
    onStart: fetchSalesStart.type,
    onError: fetchSalesFailure.type,
  }
});

export default clientSlice.reducer;