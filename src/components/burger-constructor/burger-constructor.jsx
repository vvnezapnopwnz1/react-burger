import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data }) => {
  return (
    <section className="mt-25">
      <div className={constructorStyles.list}>
        <div className={constructorStyles.element}>
          <ConstructorElement
            extraClass="ml-10"
            type="top"
            isLocked={true}
            text={`${data[0].name} верх)`}
            price={20}
            thumbnail={data[0].image}
          />
        </div>
        <div className={constructorStyles.constructorContent}>
          <div className={constructorStyles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[5].name}
              price={50}
              thumbnail={data[5].image}
            />
          </div>
          <div className={constructorStyles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[4].name}
              price={50}
              thumbnail={data[4].image}
            />
          </div>
          <div className={constructorStyles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[7].name}
              price={50}
              thumbnail={data[7].image}
            />
          </div>
          <div className={constructorStyles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[8].name}
              price={50}
              thumbnail={data[8].image}
            />
          </div>
          <div className={constructorStyles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[8].name}
              price={50}
              thumbnail={data[8].image}
            />
          </div>
          <div className={constructorStyles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[7].name}
              price={50}
              thumbnail={data[7].image}
            />
          </div>
          <div className={constructorStyles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[8].name}
              price={50}
              thumbnail={data[8].image}
            />
          </div>
          <div className={constructorStyles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[8].name}
              price={50}
              thumbnail={data[8].image}
            />
          </div>
        </div>
        <div className={constructorStyles.element}>
          <ConstructorElement
            extraClass="ml-10"
            type="bottom"
            isLocked={true}
            text={`${data[0].name} (низ)`}
            price={200}
            thumbnail={data[0].image}
          />
        </div>
      </div>
      <div className={constructorStyles.order}>
        <div>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerConstructor;
