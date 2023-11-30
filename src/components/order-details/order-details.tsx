import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { closeModal } from "../../services/reducers/modalReducer";
import Done from "../../images/done.svg";
import { useAppDispatch, useSelector } from "../../services/reducers";
import { resetOrderData } from "../../services/reducers/orderReducer";

function OrderDetails() {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(resetOrderData());
    dispatch(closeModal());
  };

  const { orderData, loading } = useSelector((state) => state.order);

  return (
    <div className={orderDetailsStyles.details}>
      <div>
        <CloseIcon type="primary" onClick={handleCloseModal} />
      </div>
      {orderData ? (
        <>
          <p
            className={`${orderDetailsStyles.order} text text_type_digits-large`}
          >
            {orderData?.order?.number}
          </p>
          <p className="text text_type_main-medium mt-8 mb-15">
            идентификатор заказа
          </p>
          <img src={Done} alt="Done" />
          <p className="text text_type_main-small mt-15 mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive mb-15">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : loading ? (
        <p className="text text_type_main-large text_color_active m-15">
          Создание заказа...
        </p>
      ) : null}
    </div>
  );
}

export default OrderDetails;
