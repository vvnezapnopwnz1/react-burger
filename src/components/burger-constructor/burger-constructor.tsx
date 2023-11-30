import React, { useEffect, useMemo } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  setIngredients,
  setBun,
  fetchOrder,
} from "../../services/reducers/orderReducer";
import { setOrderDetails } from "../../services/reducers/modalReducer";
import { useDrop } from "react-dnd";
import OrderIngredient from "../order-ingredient/order-ingredient";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/reducers/userReducer";
import {
  useSelector,
  useAppDispatch,
} from "../../services/reducers";
import { TIngredient } from "../../types";

const BurgerConstructor = () => {
  const ingredients = useSelector((state) => state.ingredients.items);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [firstItem] = ingredients;
  const restWithoutBuns = useMemo(
    () => ingredients.filter((item) => item.type !== "bun"),
    [ingredients]
  );

  useEffect(() => {
    const orderIngredients = restWithoutBuns && [
      ...restWithoutBuns.map((item) => ({ ...item, count: 1, uuid: uuidv4() })),
    ];
    firstItem && dispatch(setBun({ bun: { ...firstItem, count: 2 } }));
    dispatch(setIngredients({ orderIngredients }));
  }, [dispatch, firstItem, restWithoutBuns]);
  const nonDragableItem = (type: "top" | "bottom") =>
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
    const { bun, constructorIngredients } = order;
    dispatch(getUser())
      .unwrap()
      .then(() => {
        dispatch(setOrderDetails());
        dispatch(fetchOrder({ constructorIngredients, bun })).unwrap();
      })
      .catch((e) => navigate("/login"));
  };
  const [, drop] = useDrop(
    () => ({
      accept: "items",
      drop(item: TIngredient) {
        if (item.type === "bun") {
          dispatch(setBun({ bun: { ...item, count: 2 } }));
          return;
        }
        const newOrderIngredients = [
          ...order.constructorIngredients.map((ingredient) => {
            if (ingredient._id === item._id) {
              return {
                ...ingredient,
                count: ingredient.count && ingredient.count + 1,
              };
            }
            return ingredient;
          }),
        ];
        if (
          order.constructorIngredients.find(
            (ingredient) => ingredient._id === item._id
          )
        ) {
          dispatch(
            setIngredients({
              orderIngredients: [
                ...newOrderIngredients,
                {
                  ...newOrderIngredients.find(
                    (ingredient) => ingredient._id === item._id
                  ),
                  uuid: uuidv4(),
                },
              ],
            })
          );
        } else {
          dispatch(
            setIngredients({
              orderIngredients: [
                ...newOrderIngredients,
                {
                  ...item,
                  count: 1,
                  uuid: uuidv4(),
                },
              ],
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
      order.constructorIngredients.reduce((acc = 0, item) => {
        if (item.count) return (acc += item.price * item.count);
        return acc;
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
              <OrderIngredient key={uuidv4()} item={item} index={index} />
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

export default BurgerConstructor;
