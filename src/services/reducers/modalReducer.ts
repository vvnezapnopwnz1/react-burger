import { createSlice } from "@reduxjs/toolkit";
import { TIngredient, TOrder } from "../../types";

const initialState: {
  isOrder: boolean;
  ingredient: TIngredient | null;
  feedDetails: TOrder | null;
} = {
  isOrder: false,
  ingredient: null,
  feedDetails: null,
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
    setFeedDetails(state, action) {
      state.ingredient = null;
      state.isOrder = false;
      state.feedDetails = action.payload;
    },
    closeModal: () => initialState,
  },
});

export const { setIngredientDetails, setOrderDetails, closeModal, setFeedDetails } =
  modalSlice.actions;
export default modalSlice.reducer;
