import React, { useCallback, useState, useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editUser, logoutUser } from "../services/reducers/userReducer";

export function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState("");
  const dispatch = useDispatch();
  const onChange = (e) => {
    if (e.target.name === "password") {
      setIsEditing("password");
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    setForm(userData);
  }, [userData]);

  const logout = () => {
    dispatch(logoutUser());
  };

  const handleIsEditChange = (fieldName) => {
    setIsEditing(fieldName);
  };

  const handleCancelClick = () => {
    setIsEditing("");
    setForm(userData);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    dispatch(editUser({ value: form[isEditing], field: isEditing })).unwrap();
    setIsEditing("");
  };
  return (
    form && (
      <div className={`${styles.profile} mt-20 ml-30`}>
        <div className={styles.profileContent}>
          <div className={styles.profileNav}>
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
          <div className={`${styles.profileFormWrapper} mb-15 ml-30`}>
            <form
              className={`${styles.profileForm} mb-5`}
              onSubmit={handleSaveClick}
            >
              <Input
                onChange={onChange}
                icon={isEditing === "name" ? "CloseIcon" : "EditIcon"}
                extraClass="mb-2"
                type="text"
                placeholder="Имя"
                name="name"
                value={form.name}
                onIconClick={() => handleIsEditChange("name")}
              />
              <Input
                onChange={onChange}
                icon={isEditing === "email" ? "CloseIcon" : "EditIcon"}
                extraClass="mb-2"
                type="text"
                placeholder="Логин"
                name="email"
                value={form.email}
                onIconClick={() => handleIsEditChange("email")}
              />
              <PasswordInput
                onChange={onChange}
                icon="EditIcon"
                name={"password"}
                value={form.password ?? ""}
              />
              {isEditing !== "" && (
                <div className="mt-3 ml-30">
                  <Button
                    onClick={handleCancelClick}
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    icon={isEditing === "email" ? "CloseIcon" : "EditIcon"}
                    onIconClick={() => handleIsEditChange("password")}
                  >
                    Отмена
                  </Button>
                  <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
    )
  );
}
