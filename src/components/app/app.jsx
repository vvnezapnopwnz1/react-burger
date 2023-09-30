import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/reducers/ingredientsReducer";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { ROUTES } from "../../utils/config";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const Anonymous = () => {
    const token = localStorage.getItem("accessToken");

    return token ? <Navigate to="/" replace /> : <Outlet />;
  };

  return (
    <div className="App">
      <AppHeader />
      <Routes location={background || location}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route
          path={`${ROUTES.ingredients}/:id`}
          element={<IngredientPage />}
        />
        <Route element={<Anonymous />}>
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route
            path={ROUTES.forgotPassword}
            element={<ForgotPasswordPage />}
          />
          <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
        </Route>

        <Route
          path={ROUTES.profile}
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path={`${ROUTES.profile}/orders`}
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path={`${ROUTES.profile}/orders/:id`}
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route path={ROUTES.notFound} element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={`${ROUTES.ingredients}/:id`}
            element={
              modal.ingredient && (
                <Modal>
                  <IngredientDetails />
                </Modal>
              )
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
