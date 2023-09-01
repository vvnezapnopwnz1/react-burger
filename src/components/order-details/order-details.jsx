import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Done from "../../images/done.svg";
import PropTypes from "prop-types";

function OrderDetails({ order, handleModal }) {
  const closeModal = () => {
    handleModal(false);
  };

  return (
    <div className={orderDetailsStyles.details}>
      <div>
        <CloseIcon type="primary" onClick={closeModal} />
      </div>
      <p className={`${orderDetailsStyles.order} text text_type_digits-large`}>
        {order}
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
  );
}

OrderDetails.propTypes = {
  handleModal: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
};
export default OrderDetails;
