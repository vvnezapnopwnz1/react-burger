import React from "react";
import headerStyles from "./app-header.module.css";
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
          <p className="ml-1 text text_type_main-default">Конструктор</p>
        </div>
        <div className="ml-5">
          <ListIcon type="secondary" />
          <p className="ml-1 text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </div>
      </nav>
      <Logo />
      <div className={headerStyles.profile}>
        <ProfileIcon type="secondary" />
        <p className="ml-1 text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </div>
    </header>
  );
};

export default AppHeader;
