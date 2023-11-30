import React from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useSelector } from "../services/reducers";

export function HomePage() {
  const modal = useSelector((state) => state.modal);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className="main ml-25 mr-25">
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
      {modal.isOrder && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
