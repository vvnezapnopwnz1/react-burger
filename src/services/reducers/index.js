import { configureStore } from "@reduxjs/toolkit";
import ingredients from "./ingredientsReducer.js";
import order from "./orderReducer.js";
import modal from "./modalReducer.js";

export default configureStore({ reducer: { ingredients, order, modal } });
