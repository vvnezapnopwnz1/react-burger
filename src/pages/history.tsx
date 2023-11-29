import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./home.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../services/reducers/userReducer";
import { AppDispatch } from "../services/reducers";
import OrdersFeed from "../components/orders-feed/orders-feed";

export function HistoryPage(): JSX.Element | null {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("accessToken");

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={`${styles.profile} ml-30`}>
      <div className={styles.profileContent}>
        <div className={`${styles.profileNav} mt-20`}>
          <NavLink
            className={({ isActive }) =>
              `text text_type_main-medium m-5 ${
                !isActive && "text_color_inactive"
              }`
            }
            to="/profile"
          >
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text text_type_main-medium m-5 ${
                !isActive && "text_color_inactive"
              }`
            }
            to="/profile/orders"
          >
            История заказов
          </NavLink>
          <p
            className={`text text_type_main-medium m-5 text_color_inactive
              `}
            onClick={logout}
          >
            Выход
          </p>
        </div>
        <div className="ml-15 mt-10">
          <OrdersFeed token={token} />
        </div>
      </div>
    </div>
  );
}
