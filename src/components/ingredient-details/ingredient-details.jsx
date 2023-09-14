import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/reducers/modalReducer";
function IngredientDetails() {
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.modal.ingredient);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    ingredient && (
      <div className={ingredientDetailsStyles.ingredient}>
        <div className={ingredientDetailsStyles.ingredientHeader}>
          <p className="text text_type_main-medium">Детали ингредиента</p>
          <CloseIcon type="primary" onClick={handleCloseModal} />
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

IngredientDetails.propTypes = {};

export default IngredientDetails;
