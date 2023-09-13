import React, { useMemo, useRef } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { setIngredientDetails } from "../../services/reducers/modalReducer";

import TabItem from "../tab-item/tab-item";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("Булки");
  const ingredients = useSelector((state) => state.ingredients.items);
  const tabRef = useRef();
  const [buns, sauces, main] = useMemo(() => {
    const buns = ingredients.filter((item) => item.type === "bun");
    const sauces = ingredients.filter((item) => item.type === "sauce");
    const main = ingredients.filter((item) => item.type === "main");

    return [buns, sauces, main];
  }, [ingredients]);

  const dispatch = useDispatch();

  const handleDetails = (item) => {
    dispatch(setIngredientDetails(item));
  };

  const tabContent = (ingredients) => {
    return ingredients.map((item, index) => (
      <TabItem key={index} item={item} handleDetails={handleDetails} />
    ));
  };

  const handleScroll = (event) => {
    for (let tab of event.target.children) {
      const tabClientRect = tab.getBoundingClientRect();
      if (
        tabClientRect.height / 2 - tabClientRect.top > 0 &&
        tabClientRect.height / 2 - tabClientRect.top <
          tabRef.current.getBoundingClientRect().top
      ) {
        setCurrent(tab.id);
      }
    }
  };

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
      <div
        className={ingredientsStyles.tabContent}
        ref={tabRef}
        onScroll={handleScroll}
      >
        <div id="Булки">
          <p className="text text_type_main-medium p-10">Булки</p>
          <div className={ingredientsStyles.list}>{tabContent(buns)}</div>
        </div>
        <div id="Соусы">
          <p className="text text_type_main-medium p-10">Соусы</p>
          <div className={`${ingredientsStyles.list} pb-5`}>
            {tabContent(sauces)}
          </div>
        </div>
        <div id="Начинки">
          <p className="text text_type_main-medium p-10">Начинки</p>
          <div className={`${ingredientsStyles.list} pb-5`}>
            {tabContent(main)}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {};

export default BurgerIngredients;
