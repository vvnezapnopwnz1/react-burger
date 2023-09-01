import React, { useState, useEffect } from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { ingridientsAPI } from "../../utils/data";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function IngredientDetails({ item, handleModal }) {
  const [ingredient, setIngredient] = useState();

  useEffect(() => {
    fetch(ingridientsAPI)
      .then((res) => res.json())
      .then(({ data }) =>
        setIngredient(data.find((element) => element._id === item))
      );
  }, [item]);

  const closeModal = () => {
    handleModal(false);
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
  item: PropTypes.string.isRequired,
};

export default IngredientDetails;
