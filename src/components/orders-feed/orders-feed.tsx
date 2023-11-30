import React, { useEffect } from "react";
import feedStyles from "./orders-feed.module.css";
import FeedItem from "../feed-item/feed-item";
import {
  useAppDispatch,
  useSelector,
  wsActions,
} from "../../services/reducers";
import { TIngredient, TOrder } from "../../types";

const OrdersFeed = ({ token }: { token?: string | null }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch({ type: wsActions.wsInit, payload: token });
    } else {
      dispatch({ type: wsActions.wsInit });
    }
    return () => {
      dispatch({ type: wsActions.onClose });
    };
  }, [dispatch, token]);

  const ingredients = useSelector((state) => state.ingredients.items);
  const orders = useSelector((state) => {
    return state.feed.orders.map((order: TOrder) => {
      const ingredientsList = order.ingredients.map((value) =>
        ingredients.find(
          ({ _id }: TIngredient) => String(_id) === String(value)
        )
      );
      return {
        ...order,
        ingredients: ingredientsList ?? [],
      };
    });
  });
  const list = orders?.map((order) => (
    <FeedItem key={order._id} orderData={order} />
  ));

  return <div className={feedStyles.feedContent}>{list}</div>;
};

export default OrdersFeed;
