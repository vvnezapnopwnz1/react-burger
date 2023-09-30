import tabItemStyles from "./tab-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../utils/prop-types";
import { Link, useLocation } from "react-router-dom";

const TabItem = ({ item, handleDetails }) => {
  const location = useLocation();

  const ingredientId = item["_id"];

  const count = useSelector((state) =>
    item.type !== "bun"
      ? state.order.constructorIngredients.find(
          (ingredient) => ingredient._id === item._id
        )?.count
      : state.order?.bun?._id === item._id && state.order.bun.count
  );
  const [, drag, preview] = useDrag({
    type: "items",
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Link
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
    >
      <DragPreviewImage connect={preview} src={item.image} />
      <div
        ref={drag}
        onClick={() => handleDetails(item)}
        key={item._id}
        className={tabItemStyles.ingredientsItem}
      >
        {count > 0 && (
          <Counter count={count && count} size="default" extraClass="m-1" />
        )}
        <img alt={item.name} src={item.image} />
        <div className={`${tabItemStyles.price} m-1`}>
          <p className="text text_type_digits-default mr-1">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
    </Link>
  );
};
TabItem.propTypes = {
  item: ingredientTypes,
  handleDetails: PropTypes.func,
};

export default TabItem;
