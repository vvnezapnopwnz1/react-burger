import React, { useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editUser, logoutUser } from "../services/reducers/userReducer";
import { AppDispatch, RootState } from "../services/reducers";

enum EditFields {
  name = "name",
  email = "email",
  password = "password",
  default = "",
}

export function ProfilePage(): JSX.Element | null {
  const [form, setForm] = useState<Record<string, string>>({
    name: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState<EditFields>(EditFields.default);
  const dispatch = useDispatch<AppDispatch>();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setIsEditing(EditFields.password);
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { userData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userData) {
      setForm(userData);
    }
  }, [userData]);

  const logout = () => {
    dispatch(logoutUser());
  };

  const handleIsEditChange = (fieldName: "name" | "email" | "password") => {
    setIsEditing(EditFields[fieldName]);
  };

  const handleCancelClick = () => {
    setIsEditing(EditFields.default);
    if (userData) {
      setForm(userData);
    }
  };

  const handleSaveClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editUser({ value: form[isEditing], field: isEditing })).unwrap();
    }
    setIsEditing(EditFields.default);
  };
  return form ? (
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
  ) : null;
}
