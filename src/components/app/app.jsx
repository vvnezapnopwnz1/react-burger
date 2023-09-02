import React, { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { getIngredients } from "../../utils/burger-api";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const [food, setFood] = useState({
    isError: false,
    data: [],
    success: false,
  });

  const [modal, setModal] = useState(false);

  useEffect(() => {
    getIngredients()
      .then(({ data, success }) => setFood({ isError: false, data, success }))
      .catch(() => setFood({ isError: true }));
  }, []);

  if (food.isError) return <div>Error</div>;

  const handleModalChange = (modalData) => setModal(modalData);

  return (
    <div className="App">
      <AppHeader />
      {food.success && (
        <main className={`${styles.main} ml-25 mr-25`}>
          <BurgerIngredients
            data={food.data}
            handleDetails={handleModalChange}
          />
          <BurgerConstructor data={food.data} handleOrder={handleModalChange} />
        </main>
      )}
      {modal.order && (
        <Modal handleModal={handleModalChange}>
          <OrderDetails order={modal.order} handleModal={handleModalChange} />
        </Modal>
      )}
      {modal.item && (
        <Modal handleModal={handleModalChange}>
          <IngredientDetails
            ingredient={modal.item}
            handleModal={handleModalChange}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
