import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/reducers/modalReducer";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../services/reducers";

function IngredientDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ingredient = useSelector((state: RootState) => state.modal.ingredient);
  ingredient &&
    window.history.replaceState(
      null,
      ingredient.name,
      `/ingredients/${ingredient._id}`
    );
  const handleCloseModal = () => {
    dispatch(closeModal());
    navigate(-1);
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

export default IngredientDetails;
