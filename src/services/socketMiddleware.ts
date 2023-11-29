import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from "../services/reducers";
import { TWSStoreActions } from "../types/wsTypes";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWSStoreActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let token: string | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      if (type === wsInit) {
        if (action.payload) {
          token = action.payload.replace("Bearer ", "");
          if (token) {
            socket = new WebSocket(`${wsUrl}?token=${token}`);
          }
        } else {
          token = null;
          socket = new WebSocket(`${wsUrl}/all`);
        }
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event, ...(token && { token }) });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: { ...restParsedData } });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const payload = action.payload;
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
