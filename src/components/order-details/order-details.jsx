import React, { useContext } from "react";
import orderDetailsStyles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderContext } from "../../services/orderContext";

import Done from "../../images/done.svg";
import PropTypes from "prop-types";

function OrderDetails({ handleModal }) {
  const closeModal = () => {
    handleModal({ type: "close_modal" });
  };
  const [order] = useContext(OrderContext);
  return (
    order && (
      <div className={orderDetailsStyles.details}>
        <div>
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        <p
          className={`${orderDetailsStyles.order} text text_type_digits-large`}
        >
          {order.orderData.number}
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
      </div>
    )
  );
}

OrderDetails.propTypes = {
  handleModal: PropTypes.func.isRequired,
};
export default OrderDetails;
