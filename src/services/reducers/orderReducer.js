import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderNumber } from "../../utils/burger-api";

const initialState = {
  constructorIngredients: [],
  bun: null,
  orderData: null,
  loading: "idle",
  error: null,
};
export const fetchOrder = createAsyncThunk(
  "order",
  async ({ constructorIngredients, bun }) => {
    const ingredientsIds = [
      bun._id,
      ...constructorIngredients.map((ingredient) => ingredient._id),
      bun._id,
    ];
    return await getOrderNumber(ingredientsIds);
  }
);

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
    sortIngredients(state, action) {
      const draggingIngredient =
        state.constructorIngredients[action.payload.dragIndex];
      state.constructorIngredients[action.payload.dragIndex] =
        state.constructorIngredients[action.payload.hoverIndex];
      state.constructorIngredients[action.payload.hoverIndex] =
        draggingIngredient;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = "idle";
        state.orderData = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      });
  },
});

export const { setIngredients, addIngredient, setBun, sortIngredients } =
  orderSlice.actions;
export default orderSlice.reducer;
