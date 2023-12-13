import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice, { fetchIngredients } from "./ingredientsReducer";
import { mockIngredients } from "../../utils/mock";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Ingredients", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  const store = configureStore({ reducer: ingredientsSlice.reducer });

  it("fetchIngredients - should change status to pending when action occurs", async () => {
    store.dispatch(fetchIngredients.pending("ingredients"));
    expect(store.getState().loading).toBe("pending");
    expect(store.getState().error).toBe(null);
  });

  it("fetchIngredients - should change items list and change status when action fullfilled", async () => {
    store.dispatch(fetchIngredients.fulfilled(mockIngredients, "ingredients"));
    expect(store.getState()).toEqual({
      items: mockIngredients,
      loading: "idle",
      error: null,
    });
  });
  it("fetchIngredients - change error status when action rejected", () => {
    store.dispatch(fetchIngredients.rejected(Error("Rejected"), "ingredients"));
    expect(store.getState().error?.message).toEqual("Rejected");
  });
});
