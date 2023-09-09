import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../utils/prop-types";
function IngredientDetails({ ingredient, handleModal }) {
  const closeModal = () => {
    handleModal({ type: "close_modal" });
  };

  return (
    ingredient && (
      <div className={ingredientDetailsStyles.ingredient}>
        <div className={ingredientDetailsStyles.ingredientHeader}>
          <p className="text text_type_main-medium">Детали ингредиента</p>
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p className="text text_type_main-small mt-4 mb-8">{ingredient.name}</p>
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
    )
  );
}

IngredientDetails.propTypes = {
  handleModal: PropTypes.func.isRequired,
  ingredient: ingredientTypes.isRequired,
};

export default IngredientDetails;
