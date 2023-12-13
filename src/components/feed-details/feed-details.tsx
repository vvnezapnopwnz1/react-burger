import React from "react";
import styles from "./feed-details.module.css";
import {
  CloseIcon,
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useSelector } from "../../services/reducers";
import { TIngredient } from "../../types";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../services/reducers/modalReducer";

const FeedDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const withToken = useSelector((state) => state.feed.hasToken);

  const feedDetails = useSelector((state) => state.modal.feedDetails);
  feedDetails &&
    window.history.replaceState(
      null,
      feedDetails.name,
      !withToken
        ? `/feed/${feedDetails._id}`
        : `/profile/orders/${feedDetails._id}`
    );
  const handleCloseModal = () => {
    dispatch(closeModal());
    navigate(-1);
  };
  const totalPrice = feedDetails?.ingredients.reduce(
    (acc, el) => (acc += el.price),
    0
  );

  const ingredientsList = Array.from(new Set(feedDetails?.ingredients)).map(
    (ingredient: TIngredient) => (
      <div className={styles.ingredient}>
        <div className={styles.listItem}>
          <img
            className={styles.itemImg}
            src={ingredient.image_mobile}
            alt=""
          />
        </div>
        <p
          style={{ justifySelf: "flex-start" }}
          className={`text text_type_main-default mr-4`}
        >
          {ingredient.name}
        </p>
        <div className={styles.itemInfo}>
          <p
            className={`${styles.itemPrice} text text_type_digits-default mr-2`}
          >
            {feedDetails?.ingredients.reduce((acc, el) => {
              if (el._id === ingredient._id) acc++;
              return acc;
            }, 0)}{" "}
            x {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    )
  );

  return (
    <div className={styles.feedDetails}>
      <div className={`${styles.feedDetailsHeader} mb-10`}>
        <p
          className={`${styles.feedDetailsNumber} text text_type_digits-medium`}
        >
          #{feedDetails?.number}
        </p>
        <CloseIcon type="primary" onClick={handleCloseModal} />
      </div>
      <p className="text text_type_main-large text_color_default mb-3">
        {feedDetails?.name}
      </p>
      <p className="text text_type_main-medium text_color_inactive mb-15">
        {feedDetails?.status === "done" ? "Выполнен" : "В работе"}
      </p>
      <p className="text text_type_main-large text_color_default mb-6">
        Состав:
      </p>

      <div className={styles.feedContent}>
        <div className={styles.ingredientsList}>{ingredientsList}</div>
        <div className={styles.feedDetailsFooter}>
          <div>
            {feedDetails?.createdAt && (
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(feedDetails.createdAt)} />
              </p>
            )}
          </div>
          <div className={styles.feedDetailsCost}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetails;
