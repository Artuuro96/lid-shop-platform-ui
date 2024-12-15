import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../interfaces/inital-state.interface";
import { Auth } from "../interfaces/auth.interface";
import { AuthVerified } from "../interfaces/auth-verfied.interface";
import { setTokenCredentials } from "../utils/token";
import { redirectTo } from "./ui.slice";

const initialState: InitialState<Auth> = {
  data: {
    isAuthenticated: localStorage.getItem('isAuth') || false,
  } as Auth,
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
      state.data = action.payload;
      const expirationTime = new Date().getTime() + action.payload.expires_in * 1000; 
      const accessToken = action.payload.access_token;
      setTokenCredentials(accessToken, expirationTime);
      state.data.isAuthenticated = true;
    },
    authUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      localStorage.clear();
      state.data.isAuthenticated = false;
    },
    authVerifiedStart(state) {
      state.loading = true;
    },
    authVerifiedSuccess(state, action: PayloadAction<AuthVerified>) {
      state.loading = false;
      redirectTo('/articles')
      if(!action.payload.active) {
        state.data.isAuthenticated = false;
      }
    },
    authVerifiedFailure(state, action: PayloadAction<string>) {
      localStorage.clear();
      state.data.isAuthenticated = false;
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const {
  authUserStart,
  authUserFailure,
  authUserSuccess,
  authVerifiedStart,
  authVerifiedSuccess,
  authVerifiedFailure,
} = authSlice.actions;

export const authenticateUser = (credentials: { username: string; password: string }) => ({
  type: "api/call",
  payload: {
    url: "https://auth.lid-shop.com/realms/dp-lid-shop/protocol/openid-connect/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams({
      grant_type: import.meta.env.VITE_VERCEL_GRANT_TYPE,
      client_id: import.meta.env.VITE_VERCEL_CLIENT_ID,
      username: credentials.username,
      password: credentials.password,
      client_secret: import.meta.env.VITE_VERCEL_CLIENT_SECRET,  // Este valor lo deberías manejar de forma más segura
    }).toString(),
    onSuccess: authUserSuccess.type,
    onStart: authUserStart.type,
    onError: authUserFailure.type,
  },
});

export const verifyUser = (token: string) => ({
  type: "api/call",
  payload: {
    url: "https://auth.lid-shop.com/realms/dp-lid-shop/protocol/openid-connect/token/introspect",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams({
      client_id: import.meta.env.CLIENT_ID,
      token,
      client_secret: import.meta.env.CLIENT_SECRE,  
    }).toString(),
    onSuccess: authVerifiedSuccess.type,
    onStart: authVerifiedStart.type,
    onError: authVerifiedFailure.type,
  }
})

export default authSlice.reducer;