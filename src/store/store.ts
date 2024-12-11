import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./article.slice";
import uiReducer from "./ui.slice";
import { apiMiddleware } from "./middleware/api.middleware";
import brandReducer from "./brand.slice";
import cartReducer from "./cart.slice";
import clientReducer from "./client.slice";
import authReducer from "./auth.slice";

export const store = configureStore({
  reducer: {
    article: articleReducer,
    brands: brandReducer,
    ui: uiReducer,
    cart: cartReducer,
    clients: clientReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware), 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;