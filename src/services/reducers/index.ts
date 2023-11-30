import { configureStore } from "@reduxjs/toolkit";
import ingredients from "./ingredientsReducer";
import order from "./orderReducer";
import modal from "./modalReducer";
import auth from "./userReducer";
import { wsReducer as feed } from "./wsReducer";
import { socketMiddleware } from "../socketMiddleware";
import { WSS_API } from "../../utils/config";
import {
  TWSStoreActions,
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
} from "../../types/wsTypes";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from "react-redux";

export const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const store = configureStore({
  reducer: { ingredients, order, modal, auth, feed },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: {},
      },
    }).concat(socketMiddleware(WSS_API, wsActions)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export default store;
