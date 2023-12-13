import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/burger-api";
import { TIngredient } from "../../types";

export const fetchIngredients = createAsyncThunk("ingredients", async () => {
  const response = await getIngredients();
  return response.data;
});

type state = {
  items: TIngredient[];
  loading: string;
  error: null | SerializedError;
};

export const initialState: state = {
  items: [],
  loading: "idle",
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = "idle";
        state.items = action.payload;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      });
  },
});

export default ingredientsSlice;
