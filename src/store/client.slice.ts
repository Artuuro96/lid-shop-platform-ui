import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../interfaces/inital-state.interface";
import { Client } from "../interfaces/client-detail.interface";
import { getToken } from "../utils/token";
const { VITE_LID_SHOP_API_BASE_URL } = import.meta.env;

const initialState: InitialState<Client[]> = {
  data: [], 
  error: null,
  loading: false,
}

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    fetchClientsStart(state) {
      state.loading = true;
    },
    fetchClientsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchClientsSuccess(state, action: PayloadAction<Client[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    postClientStart(state) {
      state.loading = true;
    },
    postClientFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    postClientSuccess(state, action: PayloadAction<Client>) {
      state.loading = false;
      state.data.push(action.payload);
    },
  }
});

export const {
  fetchClientsStart,
  fetchClientsFailure,
  fetchClientsSuccess,
  postClientStart,
  postClientFailure,
  postClientSuccess,
} = clientSlice.actions;

export const fetchClients = () => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/clients`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: fetchClientsSuccess.type,
    onStart: fetchClientsStart.type,
    onError: fetchClientsFailure.type,
  }
});

export const postClient = (values: Client) => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/clients`,
    method: 'POST',
    data: values,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: postClientSuccess.type,
    onStart: postClientStart.type,
    onError: postClientFailure.type,
  }
});

export default clientSlice.reducer;