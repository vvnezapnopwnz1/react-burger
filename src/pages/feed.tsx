import React from "react";
import styles from "./home.module.css";
import OrdersFeed from "../components/orders-feed/orders-feed";
import FeedInfo from "../components/feed-info/feed-info";

export function FeedPage(): JSX.Element | null {
  return (
    <main className="main ml-25 mr-25">
      <div className={styles.feed}>
        <p className="text text_type_main-large">Лента заказов</p>
        <div className={styles.feedContent}>
          <OrdersFeed />
          <FeedInfo />
        </div>
      </div>
    </main>
  );
}
