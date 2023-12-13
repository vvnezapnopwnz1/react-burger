import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { closeModal } from "../../services/reducers/modalReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useSelector } from "../../services/reducers";

function IngredientDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ingredient = useSelector((state) => state.modal.ingredient);
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
          <button
            className={ingredientDetailsStyles.closeButton}
            onClick={handleCloseModal}
            data-cy="modal-close"
          >
            <CloseIcon data-cy="modal-close" type="primary" />
          </button>
        </div>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p
          data-cy="modal-ingredients"
          className="text text_type_main-small mt-4 mb-8"
        >
          {ingredient.name}
        </p>
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
