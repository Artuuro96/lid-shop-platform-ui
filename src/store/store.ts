import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./article.slice";
import uiReducer from "./ui.slice";
import { apiMiddleware } from "./middleware/api.middleware";
import brandReducer from "./brand.slice";
import cartReducer from "./cart.slice";
import clientReducer from "./client.slice";
import authReducer from "./auth.slice";
import saleReducer from "./sale.slice";
import fileReducer from "./file.slice";
import paymentReducer from "./payments.slice";

export const store = configureStore({
  reducer: {
    article: articleReducer,
    brands: brandReducer,
    ui: uiReducer,
    cart: cartReducer,
    clients: clientReducer,
    sales: saleReducer,
    auth: authReducer,
    files: fileReducer,
    payments: paymentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware), 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;