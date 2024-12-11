import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../interfaces/inital-state.interface";
import { Client } from "../interfaces/client-detail.interface";
import { getToken } from "../utils/token";

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
  }
});

export const {
  fetchClientsStart,
  fetchClientsFailure,
  fetchClientsSuccess,
} = clientSlice.actions;

export const fetchClients = () => ({
  type: 'api/call',
  payload: {
    url: 'http://localhost:8000/clients',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: fetchClientsSuccess.type,
    onStart: fetchClientsStart.type,
    onError: fetchClientsFailure.type,
  }
});

export default clientSlice.reducer;