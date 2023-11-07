import { configureStore } from "@reduxjs/toolkit";
import ingredients from "./ingredientsReducer";
import order from "./orderReducer";
import modal from "./modalReducer";
import auth from "./userReducer";

const store = configureStore({
  reducer: { ingredients, order, modal, auth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: {},
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
