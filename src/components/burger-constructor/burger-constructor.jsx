import React, { useContext, useEffect, useMemo, useReducer } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from "../../services/ingredientsContext";
import { OrderContext } from "../../services/orderContext";
import PropTypes from "prop-types";
import { getOrderNumber } from "../../utils/burger-api";

const BurgerConstructor = ({ handleOrderModal }) => {
  const data = useContext(IngredientsContext);
  const [, setOrder] = useContext(OrderContext);
  const [firstItem] = data;

  const restWithoutBuns = useMemo(
    () => data.filter((item) => item.type !== "bun"),
    [data]
  );
  const totalOrderSum = useMemo(
    () =>
      restWithoutBuns.reduce((acc, item) => {
        return (acc += item.price);
      }, firstItem.price * 2),
    [firstItem.price, restWithoutBuns]
  );

  const orderInitialState = { order: null, count: 0 };

  function orderReducer(state, { type }) {
    switch (type) {
      case "set":
        const newOrder = [
          firstItem._id,
          ...restWithoutBuns.map((item) => item._id),
          firstItem._id,
        ];
        return { order: newOrder };
      default:
        throw new Error(`Wrong type of action: ${type}`);
    }
  }
  const [orderState, dispatchOrder] = useReducer(
    orderReducer,
    orderInitialState,
    undefined
  );

  useEffect(() => {
    dispatchOrder({ type: "set", payload: { firstItem, restWithoutBuns } });
  }, [firstItem, restWithoutBuns]);

  const nonDragableItem = (type) => (
    <div key={`${firstItem._id}-${type}`} className={constructorStyles.element}>
      <ConstructorElement
        extraClass="ml-10"
        type={type}
        isLocked={true}
        text={`${firstItem.name} (${type === "top" ? "верх" : "низ"})`}
        price={firstItem.price}
        thumbnail={firstItem.image}
      />
    </div>
  );

  const handleOrderClick = () =>
    getOrderNumber(orderState.order).then((data) => {
      handleOrderModal(true);
      setOrder(data.order);
    });

  return (
    <section className="mt-25 mr-15 ml-10">
      <div className={`${constructorStyles.listItemsAll}`}>
        {nonDragableItem("top")}
        <div className={constructorStyles.listItems}>
          {restWithoutBuns
            .filter((item, index) => index !== 0 && index !== data.length - 1)
            .map((item, index, array) => (
              <div key={item._id} className={constructorStyles.element}>
                <DragIcon type="primary" />
                <ConstructorElement
                  extraClass="ml-4 mr-2"
                  isLocked={true}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            ))}
        </div>
        {nonDragableItem("bottom")}
      </div>
      <div className={constructorStyles.order}>
        <div>
          <p className="text text_type_digits-medium mr-2">{totalOrderSum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOrderClick}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOrderModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
