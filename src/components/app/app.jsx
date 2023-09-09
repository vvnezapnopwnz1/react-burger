import React, { useState, useEffect, useReducer } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { getIngredients } from "../../utils/burger-api";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientsContext } from "../../services/ingredientsContext";
import { OrderContext } from "../../services/orderContext";
import modalReducer from "../../services/reducers/modalReducer";
import orderReducer from "../../services/reducers/orderReducer";

function App() {
  const [food, setFood] = useState({
    isError: false,
    data: [],
    success: false,
  });

  const [modalState, dispatchModal] = useReducer(
    modalReducer,
    {
      isOpen: false,
      ingredient: null,
    },
    undefined
  );
  const orderInitialState = {
    orderIngredients: null,
    orderData: null,
    count: 0,
  };

  const orderState = useReducer(orderReducer, orderInitialState, undefined);
  useEffect(() => {
    getIngredients()
      .then(({ data, success }) => setFood({ isError: false, data, success }))
      .catch(() => setFood({ isError: true }));
  }, []);

  if (food.isError) return <div>Error</div>;

  const handleModalChange = (modalData) => {
    dispatchModal(modalData);
  };
  return (
    <div className="App">
      <AppHeader />
      <OrderContext.Provider value={orderState}>
        <IngredientsContext.Provider value={food.data}>
          {food.success && (
            <main className={`${styles.main} ml-25 mr-25`}>
              <BurgerIngredients
                data={food.data}
                handleDetails={handleModalChange}
              />
              <BurgerConstructor
                data={food.data}
                handleOrderModal={handleModalChange}
              />
            </main>
          )}
          {orderState && modalState.isOrder && (
            <Modal handleModal={handleModalChange}>
              <OrderDetails handleModal={handleModalChange} />
            </Modal>
          )}
          {modalState.ingredient && (
            <Modal handleModal={handleModalChange}>
              <IngredientDetails
                ingredient={modalState.ingredient}
                handleModal={handleModalChange}
              />
            </Modal>
          )}
        </IngredientsContext.Provider>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
