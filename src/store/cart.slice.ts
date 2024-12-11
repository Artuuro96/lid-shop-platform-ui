import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Article } from "../interfaces/article.interface";

const initialState = {
  total: 0,
  shoppingList: [] as Article[],
  availableList: [] as Article[],
}

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addAllItems(state, action: PayloadAction<Article[]>) {
      state.availableList = action.payload;
    },
    addItem(state, action: PayloadAction<Article>) {
      const filteredItems = state.availableList.filter(article => article._id !== action.payload._id);
      state.availableList = filteredItems;
      state.shoppingList.push(action.payload);
      state.total += action.payload.lidShopPrice;
    },
    removeItem(state, action: PayloadAction<Article>) {
      const filteredItems = state.shoppingList.filter(article => article._id !== action.payload._id);
      state.shoppingList = filteredItems;
      state.availableList.push(action.payload);
      state.total -= action.payload.lidShopPrice;
    }
  }
});

export const { addItem, removeItem, addAllItems } = cart.actions;
export default cart.reducer;