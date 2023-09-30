import React, { useEffect } from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export function HomePage() {
  const order = useSelector((state) => state.order.orderData);
  const modal = useSelector((state) => state.modal);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className="main ml-25 mr-25">
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
      {order && modal.isOrder && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
