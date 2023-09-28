import React from "react";
import headerStyles from "./app-header.module.css";
import { Link, NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <div className="mr-5">
          <BurgerIcon type="primary" />
          <NavLink
          to="/"
            className={({ isActive }) =>
              `ml-1 text text_type_main-default ${
                !isActive && "text_color_inactive"
              }`
            }
          >
            Конструктор
          </NavLink>
        </div>
        <div className="ml-5">
          <ListIcon type="secondary" />
          <NavLink
            className={({ isActive }) =>
              `ml-1 text text_type_main-default ${
                !isActive && "text_color_inactive"
              }`
            }
            to="/orders"
          >
            Лента заказов
          </NavLink>
        </div>
      </nav>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
      <div className={headerStyles.profile}>
        <ProfileIcon type="secondary" />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `ml-1 text text_type_main-default ${
              !isActive && "text_color_inactive"
            }`
          }
        >
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
