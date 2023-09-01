import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { ingridientsAPI } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ModalOverlay from "../modal-overlay/modal-overlay";

function App() {
  const [food, setFood] = useState({
    isError: false,
    data: [],
    success: false,
  });

  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch(ingridientsAPI)
      .then((res) => res.json())
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
      {modal &&
        createPortal(
          <ModalOverlay handleModal={handleModalChange} modalData={modal} />,
          document.body
        )}
    </div>
  );
}

export default App;
