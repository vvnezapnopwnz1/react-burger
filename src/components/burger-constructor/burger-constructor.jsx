import React, { useEffect, useMemo } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderNumber } from "../../utils/burger-api";
import { useSelector, useDispatch } from "react-redux";
import {
  setIngredients,
  setOrder,
  setBun,
} from "../../services/reducers/orderReducer";
import { setOrderDetails } from "../../services/reducers/modalReducer";
import { useDrop } from "react-dnd";
import OrderIngredient from "../order-ingredient/order-ingredient";
const BurgerConstructor = () => {
  const ingredients = useSelector((state) => state.ingredients.items);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const [firstItem] = ingredients;
  const restWithoutBuns = useMemo(
    () => ingredients.filter((item) => item.type !== "bun"),
    [ingredients]
  );

  useEffect(() => {
    const orderIngredients = restWithoutBuns && [
      ...restWithoutBuns.map((item) => ({ ...item, count: 1 })),
    ];
    firstItem && dispatch(setBun({ bun: { ...firstItem, count: 2 } }));
    dispatch(setIngredients({ orderIngredients }));
  }, [dispatch, firstItem, restWithoutBuns]);
  const nonDragableItem = (type) =>
    order.bun && (
      <div
        key={`${order.bun._id}-${type}`}
        className={constructorStyles.element}
      >
        <ConstructorElement
          extraClass="ml-10"
          type={type}
          isLocked={true}
          text={`${order.bun.name} (${type === "top" ? "верх" : "низ"})`}
          price={order.bun.price}
          thumbnail={order.bun.image}
        />
      </div>
    );

  const handleOrderClick = () => {
    getOrderNumber(order.constructorIngredients, order.bun).then((data) => {
      dispatch(setOrder(data.order));
      dispatch(setOrderDetails());
    });
  };
  const [, drop] = useDrop(
    () => ({
      accept: "items",
      drop(item) {
        if (item.type === "bun") {
          dispatch(setBun({ bun: item }));
          return;
        }
        const newOrderIngredients = [
          ...order.constructorIngredients.map((ingredient) => {
            if (ingredient._id === item._id) {
              return { ...ingredient, count: ingredient.count + 1 };
            }
            return ingredient;
          }),
        ];
        if (
          order.constructorIngredients.find(
            (ingredient) => ingredient._id === item._id
          )
        ) {
          dispatch(setIngredients({ orderIngredients: newOrderIngredients }));
        } else {
          dispatch(
            setIngredients({
              orderIngredients: newOrderIngredients.concat({
                ...item,
                count: 1,
              }),
            })
          );
        }
      },
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          didDrop: monitor.didDrop(),
          isOverCurrent: monitor.isOver({ shallow: true }),
        };
      },
    }),
    [order]
  );

  const totalOrderSum = useMemo(
    () =>
      order.constructorIngredients.reduce((acc, item) => {
        return (acc += item.price * item.count);
      }, order?.bun?.price),
    [order?.bun?.price, order.constructorIngredients]
  );
  return (
    <section className="mt-25 mr-15 ml-10">
      <div ref={drop} className={`${constructorStyles.listItemsAll}`}>
        {nonDragableItem("top")}
        <div className={constructorStyles.listItems}>
          {order.constructorIngredients &&
            order.constructorIngredients.map((item, index) => (
              <OrderIngredient key={item._id} item={item} index={index} />
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

BurgerConstructor.propTypes = {};

export default BurgerConstructor;
