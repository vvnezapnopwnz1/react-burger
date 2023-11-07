import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/reducers/modalReducer";
import Done from "../../images/done.svg";
import { RootState } from "../../services/reducers";

function OrderDetails() {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const { orderData } = useSelector((state: RootState) => state.order);

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
      ) : null}
    </div>
  );
}

export default OrderDetails;
