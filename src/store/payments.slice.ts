import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState } from '../interfaces/inital-state.interface';
import { getToken } from '../utils/token';
import { Payment } from '../interfaces/payment.interface';
const { VITE_LID_SHOP_API_BASE_URL } = import.meta.env;

const initialState: InitialState<Payment[]> = {
  data: [],
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    postPaymentStart(state) {
      state.loading = true;
    },
    postPaymentSuccess(state, action: PayloadAction<Payment>) {
      state.data.push(action.payload);
      state.loading = false;
    },
    postPaymentFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false
    },
    fetchPaymentsStart(state) {
      state.loading = true;
    },
    fetchPaymentsSuccess(state, action: PayloadAction<Payment[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchPaymentsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const { 
  postPaymentSuccess,
  postPaymentFailure,
  postPaymentStart,
  fetchPaymentsFailure,
  fetchPaymentsStart,
  fetchPaymentsSuccess,
} = paymentsSlice.actions;

export const postPayment = (payment: Payment) => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/payments`,
    method: 'POST',
    data: payment,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: postPaymentSuccess.type,
    onStart: postPaymentFailure.type,
    onError: postPaymentStart.type,
  },
}); 

export const fetchPayments = () => ({
  type: 'api/call',
  payload: {
    url: `${VITE_LID_SHOP_API_BASE_URL}/payments`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    onSuccess: fetchPaymentsSuccess.type,
    onStart: fetchPaymentsFailure.type,
    onError: fetchPaymentsStart.type,
  },
}); 

export default paymentsSlice.reducer;
