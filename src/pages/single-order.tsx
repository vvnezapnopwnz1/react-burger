import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useSelector } from "../services/reducers";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TOrder } from "../types";
import { getOrder } from "../utils/burger-api";
import { wsActions } from "../services/reducers";
import { ROUTES } from "../utils/config";

export function SingleOrderPage() {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch({ type: wsActions.wsInit });
      return () => {
        dispatch({ type: wsActions.onClose });
      };
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  let { pathname } = useLocation();
  const ingredients = useSelector((state) => state.ingredients.items);
  const hasToken = useSelector((state) => state.feed.hasToken);
  const orderInFeed = useSelector((state) =>
    state.feed.orders.find(
      ({ _id }: { _id: string }) => _id === pathname.replace("/feed/", "")
    )
  );
  const [feedDetails, setFeedDetails] = useState<TOrder>();

  useEffect(() => {
    if (orderInFeed) {
      setFeedDetails(orderInFeed);
    } else {
      if (pathname.startsWith(ROUTES.feed)) {
        getOrder(pathname.replace("/feed/", ""), hasToken).then((res) => {
          setFeedDetails(res?.orders[0]);
        });
      } else {
        getOrder(pathname.replace("/profile/orders/", ""), hasToken).then(
          (res) => {
            setFeedDetails(res?.orders[0]);
          }
        );
      }
    }
  }, [hasToken, orderInFeed, pathname]);

  const ingredientsList = feedDetails?.ingredients.map(
    (value: TIngredient) =>
      ingredients &&
      ingredients.find(({ _id }: TIngredient) => String(_id) === String(value))
  );

  const totalPrice =
    ingredientsList &&
    ingredientsList.reduce((acc, el) => {
      if (el?.price) {
        acc += el.price;
      }
      return acc;
    }, 0);

  const listItems =
    feedDetails?.ingredients &&
    ingredientsList &&
    ingredientsList
      .filter(
        (value: TIngredient | undefined, index: number, self) =>
          self.indexOf(value) === index
      )
      .map((ingredient: TIngredient | undefined) => {
        return (
          <div className={`${styles.order} mb-2`}>
            <div className={styles.listItem}>
              <img src={ingredient?.image_mobile} alt="" />
            </div>
            <p
              className="text text_type_main-default mr-4"
              style={{ justifySelf: "flex-start" }}
            >
              {ingredient?.name}
            </p>
            <div className={styles.listItemFooter}>
              <p className="text text_type_digits-default mr-2">
                {
                  ingredientsList.filter(
                    (item) => item?._id === ingredient?._id
                  ).length
                }{" "}
                x {ingredient?.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        );
      });

  return (
    <div className={styles.ingredient}>
      <div className={styles.orderContent}>
        <p className="text text_type_digits-medium mb-10">
          #{feedDetails?.number}
        </p>
        <p className="text text_type_main-large text_color_default mb-3">
          {feedDetails?.name}
        </p>
        <p className="text text_type_main-medium text_color_inactive mb-15">
          {feedDetails?.status === "done" ? "Выполнен" : "В работе"}
        </p>
        <p className="text text_type_main-large text_color_default mb-6">
          Состав:
        </p>
        <div className={styles.itemContent}>
          <div className={styles.ingredientsList}>{listItems}</div>
          <div className={styles.orderFooter}>
            <div>
              {feedDetails?.createdAt && (
                <p className="text text_type_main-default text_color_inactive">
                  <FormattedDate date={new Date(feedDetails.createdAt)} />
                </p>
              )}
            </div>
            <div>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
