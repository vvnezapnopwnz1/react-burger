import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { getOrderNumber } from "../../utils/burger-api";
import { TOrderNumberResponse, TIngredient } from "../../types";

type state = {
  constructorIngredients: Array<TIngredient & { uuid: string; count: number }>;
  bun: TIngredient | null;
  loading: string;
  error: SerializedError | null;
  orderData: TOrderNumberResponse | null;
};

const initialState: state = {
  constructorIngredients: [],
  bun: null,
  orderData: null,
  loading: "idle",
  error: null,
};
export const fetchOrder = createAsyncThunk(
  "order",
  async ({
    constructorIngredients,
    bun,
  }: {
    constructorIngredients: TIngredient[];
    bun: TIngredient | null;
  }) => {
    if (bun) {
      const ingredientsIds = [
        bun._id,
        ...constructorIngredients.map(
          (ingredient: TIngredient) => ingredient._id
        ),
        bun._id,
      ];
      return await getOrderNumber(ingredientsIds);
    }
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
    resetOrderData(state) {
      state.orderData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = "idle";
          state.orderData = action.payload;
        }
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

export const { setIngredients, setBun, sortIngredients, resetOrderData } =
  orderSlice.actions;
export default orderSlice;
