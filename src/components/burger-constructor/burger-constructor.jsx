import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../utils/prop-types";

const BurgerConstructor = ({ data, handleOrder }) => {
  const [firstItem, ...restItems] = data;
  const nonDragableItem = (type) => (
    <div key={`${firstItem._id}-${type}`} className={constructorStyles.element}>
      <ConstructorElement
        extraClass="ml-10"
        type={type}
        isLocked={true}
        text={`${firstItem.name} (низ)`}
        price={firstItem.price}
        thumbnail={firstItem.image}
      />
    </div>
  );
  return (
    <section className="mt-25 mr-15 ml-10">
      <div className={`${constructorStyles.listItemsAll}`}>
        {nonDragableItem("top")}
        <div className={constructorStyles.listItems}>
          {restItems
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
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => handleOrder({ order: "034536" })}
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
  data: PropTypes.arrayOf(ingredientTypes).isRequired,
  handleOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
