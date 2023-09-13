import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  constructorIngredients: [],
  orderData: null,
  bun: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIngredients(state, action) {
      state.constructorIngredients = action.payload.orderIngredients;
    },
    setBun(state, action) {
      state.bun = action.payload.bun;
    },
    setOrder(state, action) {
      return { ...state, orderData: action.payload };
    },
    sortIngredients(state, action) {
      const draggingIngredient =
        state.constructorIngredients[action.payload.dragIndex];
      state.constructorIngredients[action.payload.dragIndex] =
        state.constructorIngredients[action.payload.hoverIndex];
      state.constructorIngredients[action.payload.hoverIndex] =
        draggingIngredient;
    },
  },
});

export const {
  setIngredients,
  setOrder,
  addIngredient,
  setBun,
  sortIngredients,
} = orderSlice.actions;
export default orderSlice.reducer;
