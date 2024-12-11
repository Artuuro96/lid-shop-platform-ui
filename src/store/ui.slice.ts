import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertUI } from "../interfaces/ui.interface";

const initialState: AlertUI = {
  open: false,
  type: '',
  message: '',
  path: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAlert: (state: AlertUI, action: PayloadAction<AlertUI>) =>  {
      state.message = action.payload.message;
      state.open = action.payload.open
      state.type = action.payload.type
    },
    redirectTo: (state: AlertUI, action: PayloadAction<string>) => {
      state.path = action.payload;
    }
  }, 
});

export const { showAlert, redirectTo } = uiSlice.actions;
export default uiSlice.reducer;
