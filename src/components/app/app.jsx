import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/reducers/ingredientsReducer";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const order = useSelector((state) => state.order.orderData);
  const modal = useSelector((state) => state.modal);
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      {ingredients.items && (
        <DndProvider backend={HTML5Backend}>
          <main className={`${styles.main} ml-25 mr-25`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      )}
      {order && modal.isOrder && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
      {modal.ingredient && (
        <Modal>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
