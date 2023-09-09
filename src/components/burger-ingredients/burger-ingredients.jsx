import React, { useMemo } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../utils/prop-types";

const BurgerIngredients = ({ data, handleDetails }) => {
  const [current, setCurrent] = React.useState("Булки");
  const [buns, sauces] = useMemo(() => {
    const buns = data.filter((item) => item.type === "bun");
    const sauces = data.filter((item) => item.type === "sauce");

    return [buns, sauces];
  }, [data]);

  const tabContent = (ingredients) =>
    ingredients.map((item, index) => (
      <div
        onClick={() =>
          handleDetails({
            type: "ingredient_details",
            ingredient: item,
          })
        }
        key={item._id}
        className={ingredientsStyles.ingredientsItem}
      >
        {index === 0 && <Counter count={1} size="default" extraClass="m-1" />}
        <img alt={item.name} src={item.image} />
        <div className={`${ingredientsStyles.price} m-1`}>
          <p className="text text_type_digits-default mr-1">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
    ));

  return (
    <section className={`${ingredientsStyles.ingredientsContent} mt-10 ml-10`}>
      <div>
        <p className="text text_type_main-large">Соберите бургер</p>
        <div className={ingredientsStyles.tabs}>
          <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </div>
      </div>
      <div className={ingredientsStyles.tabContent}>
        <div>
          <p className="text text_type_main-medium p-10">Булки</p>
          <div className={ingredientsStyles.list}>
            {tabContent(buns)}
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium p-10">Соусы</p>
          <div className={`${ingredientsStyles.list} pb-5`}>
            {tabContent(sauces)}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientTypes).isRequired,
  handleDetails: PropTypes.func.isRequired,
};

export default BurgerIngredients;
