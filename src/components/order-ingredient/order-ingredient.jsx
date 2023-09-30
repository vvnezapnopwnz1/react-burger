import React, { useRef } from "react";
import constructorStyles from "./order-ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  sortIngredients,
  setIngredients,
} from "../../services/reducers/orderReducer";
import { useDrop, useDrag } from "react-dnd";
import { ingredientTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";

const OrderIngredient = ({ item, index }) => {
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const handleDeleteClick = (item) => {
    const newOrderIngredients = [
      ...order.constructorIngredients
        .map((ingredient) => {
          if (ingredient._id === item._id) {
            return {
              ...ingredient,
              count: ingredient.count > 0 ? ingredient.count - 1 : 0,
            };
          }
          return ingredient;
        })
        .filter(
          (ingredient) => item.uuid !== ingredient.uuid && item.count > 0
        ),
    ];
    dispatch(setIngredients({ orderIngredients: newOrderIngredients }));
  };
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(sortIngredients({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: () => {
      return { item: item._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));
  return (
    <div
      style={{ opacity }}
      ref={ref}
      key={item._id}
      className={constructorStyles.element}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass="ml-4 mr-2"
        isLocked={false}
        handleClose={() => handleDeleteClick(item)}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
};

OrderIngredient.propTypes = {
  item: ingredientTypes,
  index: PropTypes.number,
};

export default OrderIngredient;
