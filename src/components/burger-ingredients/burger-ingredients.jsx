import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("Булки");

  return (
    <section className={`${ingredientsStyles.ingerdients} mt-10 mr-10`}>
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
      <div className={ingredientsStyles.tabContent}>
        <div>
          <p className="text text_type_main-medium p-10">Булки</p>
          <div className={ingredientsStyles.list}>
            <div className={ingredientsStyles.ingredientsItem}>
              <Counter count={1} size="default" extraClass="m-1" />
              <img alt={data[0].name} src={data[0].image} />
              <div className={`${ingredientsStyles.price} m-1`}>
                <p className="text text_type_digits-default mr-1">20</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{data[0].name}</p>
            </div>
            <div className={ingredientsStyles.ingredientsItem}>
              <img alt={data[3].name} src={data[14].image} />
              <div className={`${ingredientsStyles.price} m-1`}>
                <p className="text text_type_digits-default mr-1">20</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{data[14].name}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium p-10">Соусы</p>
          <div className={`${ingredientsStyles.list} pb-5`}>
            <div className={ingredientsStyles.ingredientsItem}>
              <img alt={data[3].name} src={data[3].image} />
              <div className={`${ingredientsStyles.price} m-1`}>
                <p className="text text_type_digits-default mr-1">20</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{data[3].name}</p>
            </div>
            <div className={ingredientsStyles.ingredientsItem}>
              <img alt={data[6].name} src={data[6].image} />
              <div className={`${ingredientsStyles.price} m-1`}>
                <p className="text text_type_digits-default mr-1">20</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{data[6].name}</p>
            </div>
          </div>
          <div className={`${ingredientsStyles.list} mt-5`}>
            <div className={ingredientsStyles.ingredientsItem}>
              <Counter count={1} size="default" extraClass="m-1" />
              <img alt={data[5].name} src={data[5].image} />
              <div className={`${ingredientsStyles.price} m-1`}>
                <p className="text text_type_digits-default mr-1">20</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{data[5].name}</p>
            </div>
            <div className={ingredientsStyles.ingredientsItem}>
              <img alt={data[9].name} src={data[9].image} />
              <div className={`${ingredientsStyles.price} m-1`}>
                <p className="text text_type_digits-default mr-1">20</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{data[9].name}</p>
            </div>
          </div>
          <div className={`${ingredientsStyles.list} mt-5`}>
            <div className={ingredientsStyles.ingredientsItem}>
              <img alt={data[5].name} src={data[5].image} />
              <div className={`${ingredientsStyles.price} m-1`}>
                <p className="text text_type_digits-default mr-1">20</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{data[5].name}</p>
            </div>
            <div className={ingredientsStyles.ingredientsItem}>
              <img alt={data[9].name} src={data[9].image} />
              <div className={`${ingredientsStyles.price} m-1`}>
                <p className="text text_type_digits-default mr-1">20</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{data[9].name}</p>
            </div>
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
    })
  ).isRequired,
};

export default BurgerIngredients;
