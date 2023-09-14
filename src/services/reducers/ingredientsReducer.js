import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/burger-api";

export const fetchIngredients = createAsyncThunk(
  "ingredients",
  async () => {
    const response = await getIngredients();
    return response.data;
  }
);

const initialState = {
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

export default ingredientsSlice.reducer;
