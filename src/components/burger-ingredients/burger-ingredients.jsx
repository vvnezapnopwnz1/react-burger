import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerIngredients = ({ data, handleDetails }) => {
  const [current, setCurrent] = React.useState("Булки");

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
            {data &&
              data
                .filter((item) => item.type === "bun")
                .map((item, index) => (
                  <div
                    onClick={() => handleDetails({ item: item._id })}
                    key={item._id}
                    className={ingredientsStyles.ingredientsItem}
                  >
                    {index === 0 && (
                      <Counter count={1} size="default" extraClass="m-1" />
                    )}
                    <img alt={item.name} src={item.image} />
                    <div className={`${ingredientsStyles.price} m-1`}>
                      <p className="text text_type_digits-default mr-1">
                        {item.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">{item.name}</p>
                  </div>
                ))}
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium p-10">Соусы</p>
          <div className={`${ingredientsStyles.list} pb-5`}>
            {data
              .filter((item) => item.type === "sauce")
              .map((item, index) => (
                <div
                  onClick={() => handleDetails({ item: item._id })}
                  key={item._id}
                  className={ingredientsStyles.ingredientsItem}
                >
                  {index === 2 && (
                    <Counter count={1} size="default" extraClass="m-1" />
                  )}
                  <img alt={item.name} src={item.image} />
                  <div className={`${ingredientsStyles.price} m-1`}>
                    <p className="text text_type_digits-default mr-1">
                      {item.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">{item.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
