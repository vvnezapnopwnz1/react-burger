import React from "react";
import ingredientDetailsStyles from "./home.module.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "../services/reducers";

export function IngredientPage() {
  let { pathname } = useLocation();
  const ingredient = useSelector((state) =>
    state.ingredients.items.find(
      (item) => item._id === pathname.replace("/ingredients/", "")
    )
  );
  return ingredient ? (
    <div className={ingredientDetailsStyles.ingredient}>
      <div className={ingredientDetailsStyles.ingredientHeader}>
        <p className="mt-20 text text_type_main-large">Детали ингредиента</p>
      </div>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <div
        className={`${ingredientDetailsStyles.ingredientProps} text text_type_main-small text_color_inactive`}
      >
        <div className="">
          <span>Каллорий,калл</span>
          <span>{ingredient.calories}</span>
        </div>
        <div>
          <span>Каллорий,калл</span>
          <span>{ingredient.proteins}</span>
        </div>
        <div>
          <span>Каллорий,калл</span>
          <span>{ingredient.fat}</span>
        </div>
        <div>
          <span>Каллорий,калл</span>
          <span>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  ) : null;
}
