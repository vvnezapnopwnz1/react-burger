import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const BurgerConstructor = ({ data }) => {
  return (
    <section className={`${constructorStyles.list} mt-25`}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ConstructorElement
            extraClass="ml-10"
            type="top"
            isLocked={true}
            text={data[0].name}
            price={20}
            thumbnail={data[0].image}
          />
        </div>
        <div className={constructorStyles.constructorContent}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[5].name}
              price={50}
              thumbnail={data[5].image}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[4].name}
              price={50}
              thumbnail={data[4].image}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[7].name}
              price={50}
              thumbnail={data[7].image}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[8].name}
              price={50}
              thumbnail={data[8].image}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[8].name}
              price={50}
              thumbnail={data[8].image}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[7].name}
              price={50}
              thumbnail={data[7].image}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[8].name}
              price={50}
              thumbnail={data[8].image}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-4"
              text={data[8].name}
              price={50}
              thumbnail={data[8].image}
            />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ConstructorElement
            extraClass="ml-10"
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
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
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  })).isRequired
}

export default BurgerConstructor;
