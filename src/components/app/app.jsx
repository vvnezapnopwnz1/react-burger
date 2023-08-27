import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
// import logo from './logo.svg';
import styles from "./app.module.css";
import { data } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={`${styles.main} ml-25 mr-25`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
