import { configureStore } from "@reduxjs/toolkit";
import modalSlice, {
  setFeedDetails,
  setOrderDetails,
  closeModal,
  setIngredientDetails,
  initialState,
} from "./modalReducer";
import { mockSingleIngredient } from "../../utils/mock";

describe("Modal", () => {
  const store = configureStore({ reducer: modalSlice.reducer });

  it("setInggredientDetails - should change  ingredient field to feed info", async () => {
    store.dispatch(setIngredientDetails(mockSingleIngredient));
    expect(store.getState().ingredient).toBe(mockSingleIngredient);
    expect(store.getState().isOrder).toBeFalsy();
  });
  it("setFeedDetails - should change feedDetails to feed info", async () => {
    store.dispatch(setFeedDetails(mockSingleIngredient));
    expect(store.getState().feedDetails).toBe(mockSingleIngredient);
    expect(store.getState().ingredient).toBeNull();
    expect(store.getState().isOrder).toBeFalsy();
  });
  it("setOrderDetails - should change order status and nullify ingredient field", async () => {
    store.dispatch(setOrderDetails());
    expect(store.getState().ingredient).toBeNull();
    expect(store.getState().isOrder).toBeTruthy();
  });

  it("closeModal - should change state to initial", async () => {
    store.dispatch(closeModal());
    expect(store.getState()).toEqual(initialState);
  });
});
