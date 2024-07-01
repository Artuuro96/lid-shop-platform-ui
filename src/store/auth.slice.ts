import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../interfaces/inital-state.interface";
import { Auth } from "../interfaces/auth.interface";

const initialState: InitialState<Auth> = {
  data: {} as Auth,
  error: null,
  loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUserStart(state) {
      state.loading = true;
    },
    authUserSuccess(state, action: PayloadAction<Auth>) {
      state.loading = false;
      state.data = action.payload
    },
    authUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  authUserStart,
  authUserFailure,
  authUserSuccess,
} = authSlice.actions;

export const fetchArticles = () => ({
  type: 'api/call',
  payload: {
    url: 'http://localhost:8000/articles',
    method: 'GET',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDU0NWZiMi1iODhjLTQ1ZDMtYjBkOS1iMTgzZGNiOTBhNTciLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6InN5c3RlbSIsImxhc3ROYW1lIjoiYWNtYSIsInNlY29uZExhc3ROYW1lIjoidXNlciIsImVtYWlsIjoiYXJ0dXJvcm9kcjk2QGdtYWlsLmNvbSIsInJvbGVzIjpbXSwibW9kdWxlcyI6W10sImlhdCI6MTcxOTQ2Mzg5MCwiZXhwIjoxNzE5NDY3NDkwfQ.Y7m1pO1IU3EQFeM4rZRzxF3T4m8tPIUIStweKV3wpcY',
    },
    onSuccess: authUserSuccess.type,
    onStart: authUserStart.type,
    onError: authUserFailure.type,
  },
});