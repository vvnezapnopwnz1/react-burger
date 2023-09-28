import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/reducers/ingredientsReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  ResetPasswordPage,
  LoginPage,
  ForgotPasswordPage,
  ProfilePage,
  NotFound404,
  IngredientPage,
} from "../../pages";
import { ProtectedRouteElement } from "../protected-route";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          <Route
            path="/profile/orders"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          <Route
            path="/profile/orders/:id"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
