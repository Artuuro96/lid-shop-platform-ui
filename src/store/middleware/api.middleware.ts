import { Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import { redirectTo, showAlert } from "../ui.slice";
import { authVerifiedFailure } from "../auth.slice";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiMiddleware: Middleware = ({ dispatch }) => (next) => async (action: any) => {

  if(action.type !== 'api/call') {
    return next(action);
  }

  const { url, method, data, headers, onSuccess, onError, onStart } = action.payload;

  if(onStart) {
    dispatch({ type: onStart });
  }

  try {
    const response = await axios.request({
      baseURL: "http://localhost:8000/",
      headers,
      url,
      method,
      data
    });
    dispatch({ type: onSuccess, payload: response.data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message)
    const { method, onSuccess } = action.payload
    dispatch({ 
      type: onError, 
      payload: { 
        message: error?.response?.data.message || error.message,
        code: error?.response?.data.statusCode,
      }
    });
    dispatch(showAlert({
      message: `${method} ${onSuccess.split('/')[0]} failed: ${error.message || 'Something went wrong'}` ,
      open: true,
      type: 'error' 
    }));
    if(error?.response?.data?.statusCode === 401) {
      setTimeout(() => {
        dispatch(authVerifiedFailure(''));
        dispatch(redirectTo('/login'));
      }, 2000)
    }
  }
}