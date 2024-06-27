import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./article.slice";
import uiReducer from "./ui.slice";
import { apiMiddleware } from "./middleware/api.middleware";
import brandReducer from "./brand.slice";

export const store = configureStore({
  reducer: {
    article: articleReducer,
    brand: brandReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware), 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;