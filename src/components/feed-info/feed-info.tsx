import React, { useMemo, useRef } from "react";
import styles from "./feed-info.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../services/reducers";
import { TOrder } from "../../types";

// type TOrderIngredient = {
//   item: TIngredient & { uuid: string; count: number };
//   index: number;
// };

const FeedInfo = () => {
  // const order = useSelector((state: RootState) => state.order);

  const { total, totalToday, orders } = useSelector(
    (state: RootState) => state.feed
  );

  const readyOrders = useMemo(
    () =>
      orders
        .filter((order: TOrder) => order.status === "done")
        .map((order: TOrder) => (
          <p
            key={order.number}
            className="text text_type_digits-default text_color_inactive mb-2"
          >
            {order.number}
          </p>
        )),
    [orders]
  );

  const inProgressOrders = useMemo(
    () =>
      orders
        .filter((order: TOrder) => order.status !== "done")
        .map((order: TOrder) => (
          <p
            key={order.number}
            className="text text_type_digits-default text_color_default mb-2"
          >
            {order.number}
          </p>
        )),
    [orders]
  );

  return (
    <div className={styles.feedInfo}>
      <div className={styles.feedInfoDesk}>
        <div>
          <p className="text text_type_main-medium mb-2">Готовы:</p>
          <div className={styles.deskList}>{readyOrders.slice(0, 10)}</div>
        </div>
        {readyOrders.length > 10 ? (
          <div className="mt-10">{readyOrders.slice(10, 20)}</div>
        ) : null}
        <div>
          <p className="text text_type_main-medium mb-2">В работе:</p>
          <div className={styles.deskList}>
            <div className={styles.deskList}>
              {inProgressOrders.slice(0, 10)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${styles.overallData} text text_type_digits-large`}>
          {total}
        </p>
      </div>
      <div className="mt-6">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.overallData} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </div>
  );
};

export default FeedInfo;
