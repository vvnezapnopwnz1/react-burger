import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { type RootState, type AppDispatch } from "../../services/reducers";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/reducers/ingredientsReducer";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
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
import { FeedPage } from "../../pages/feed";
import FeedDetails from "../feed-details/feed-details";
import { SingleOrderPage } from "../../pages/single-order";
import { HistoryPage } from "../../pages/history";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const background = location.state && location.state.background;
  const modal = useSelector((state: RootState) => state.modal);

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
        <Route path={`${ROUTES.feed}/:id`} element={<SingleOrderPage />} />
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
          element={<ProtectedRouteElement element={<HistoryPage />} />}
        />
        <Route
          path={`${ROUTES.profile}/orders/:id`}
          element={<ProtectedRouteElement element={<SingleOrderPage />} />}
        />
        <Route path={`${ROUTES.feed}`} element={<FeedPage />} />
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
          <Route
            path={`${ROUTES.feed}/:id`}
            element={
              modal.feedDetails && (
                <Modal>
                  <FeedDetails />
                </Modal>
              )
            }
          />
          <Route
            path={`${ROUTES.profile}/orders/:id`}
            element={
              modal.feedDetails && (
                <Modal>
                  <FeedDetails />
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
