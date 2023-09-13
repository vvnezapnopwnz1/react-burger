import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOrder: false,
  ingredient: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIngredientDetails(state, action) {
      state.isOrder = false;
      state.ingredient = action.payload;
    },
    setOrderDetails(state) {
      state.ingredient = null;
      state.isOrder = true;
    },
    closeModal: () => initialState,
  },
});

export const { setIngredientDetails, setOrderDetails, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
