import { configureStore } from "@reduxjs/toolkit";
import { wsReducer, initialState } from "./wsReducer";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../../types/wsTypes";
import { orders } from "../../utils/mock";

describe("ws", () => {
  const store = configureStore({ reducer: wsReducer });

  it("ws change status when connection succeded", () => {
    store.dispatch({ type: WS_CONNECTION_SUCCESS, payload: {} });
    expect(store.getState().wsConnected).toBe(true);
  });

  it("ws set orders data on message", () => {
    store.dispatch({
      type: WS_GET_MESSAGE,
      payload: { orders, total: 1, totalToday: 1 },
    });
    expect(store.getState().orders).toBe(orders);
    expect(store.getState()).not.toMatchObject(initialState);
  });

  it("ws on connection clossed", () => {
    store.dispatch({
      type: WS_CONNECTION_CLOSED,
    });
    expect(store.getState().wsConnected).toBeFalsy();
    expect(store.getState().orders).not.toMatchObject(orders);
  });
});
