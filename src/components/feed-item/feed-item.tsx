import React from "react";
import styles from "./feed-item.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../types";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useSelector } from "../../services/reducers";
import { setFeedDetails } from "../../services/reducers/modalReducer";

type TFeedItem = {
  orderData: {
    ingredients: (TIngredient | undefined)[];
    _id: string;
    success: boolean;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
  };
};

const FeedItem = ({ orderData }: TFeedItem) => {
  const { number, name, ingredients, createdAt } = orderData;

  const withToken = useSelector((state) => state.feed.hasToken);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const ingredientsList =
    ingredients &&
    ingredients.map((ingredient: TIngredient | undefined, index: number) => (
      <div
        key={index}
        className={styles.listItem}
        style={{
          position: index > 0 ? "relative" : "inherit",
          right: index * 20,
          zIndex: ingredients.length - index,
        }}
      >
        <img
          src={ingredient?.image_mobile}
          alt=""
          style={{
            opacity: index === 5 && ingredients.length > 5 ? 0.7 : 1,
          }}
        />
        {index === 5 && ingredients.length > 5 && (
          <p className="text text_type_main-default">
            +{ingredients.length - 6}
          </p>
        )}
      </div>
    ));

  const totalPrice = ingredients.reduce((acc, el) => {
    if (el?.price) {
      acc += el.price;
    }
    return acc;
  }, 0);

  const handleDetails = () => dispatch(setFeedDetails(orderData));

  return (
    <Link
      key={orderData._id}
      to={
        !withToken
          ? `/feed/${orderData._id}`
          : `/profile/orders/${orderData._id}`
      }
      state={{ background: location }}
      onClick={() => handleDetails()}
    >
      <div className={!withToken ? styles.feedItem : styles.feedItemHistory}>
        <div className={styles.feedItemHeader}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <p className="text text_type_main-medium mb-6 mt-6">{name}</p>
        <div className={styles.feedContent}>
          <div className={styles.ingredientsList}>
            {ingredientsList.slice(0, 6)}
          </div>
          <div>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedItem;
