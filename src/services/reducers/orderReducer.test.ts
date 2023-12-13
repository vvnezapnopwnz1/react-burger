import { configureStore } from "@reduxjs/toolkit";
import orderSlice, { fetchOrder } from "./orderReducer";
import { mockOrderIngredients, mockOrderResponse } from "../../utils/mock";

describe("Order", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const store = configureStore({ reducer: orderSlice.reducer });
  it("SetIngredients - should change constructorIngredients when action occurs", async () => {
    store.dispatch(
      orderSlice.actions.setIngredients({
        orderIngredients: mockOrderIngredients,
      })
    );
    expect(store.getState().constructorIngredients).toBe(mockOrderIngredients);
  });

  it("SetBun - should change bun when action occurs", async () => {
    store.dispatch(
      orderSlice.actions.setBun({
        bun: mockOrderIngredients[0],
      })
    );
    expect(store.getState().bun).toBe(mockOrderIngredients[0]);
  });

  it("SortIngredients - should change ingredients order when action occurs", async () => {
    store.dispatch(
      orderSlice.actions.sortIngredients({
        dragIndex: 1,
        hoverIndex: 0,
      })
    );
    const reversed = Array.from(mockOrderIngredients).reverse();
    expect(store.getState().constructorIngredients).toStrictEqual(reversed);
  });

  it("ResetOrderData - should change bun when action occurs", async () => {
    store.dispatch(orderSlice.actions.resetOrderData());
    expect(store.getState().orderData).toBeNull();
  });
  it("FetchOrder - should change status to pending when action occurs", async () => {
    store.dispatch(
      fetchOrder.pending("order", {
        constructorIngredients: mockOrderIngredients,
        bun: mockOrderIngredients[0],
      })
    );
    expect(store.getState().loading).toBe("pending");
    expect(store.getState().error).toBe(null);
  });

  it("FetchOrder - should change items list and change status when action fullfilled", async () => {
    store.dispatch(
      fetchOrder.fulfilled(mockOrderResponse, "", {
        constructorIngredients: mockOrderIngredients,
        bun: mockOrderIngredients[0],
      })
    );
    expect(store.getState().orderData).toEqual(mockOrderResponse);
  });
  it("FetchOrder - change error status when action rejected", () => {
    store.dispatch(
      fetchOrder.rejected(Error("Rejected"), "", {
        constructorIngredients: mockOrderIngredients,
        bun: mockOrderIngredients[0],
      })
    );
    expect(store.getState().error?.message).toEqual("Rejected");
  });
});
