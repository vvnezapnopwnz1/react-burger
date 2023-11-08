import React, { SyntheticEvent, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./home.module.css";
import { resetPassword } from "../utils/burger-api";
import { useForm } from "../hooks/useForm";

type FormStateType = {
  token: string;
  password: string;
};

const initialFormState: FormStateType = {
  token: "",
  password: "",
};

export function ResetPasswordPage() {
  const { values, handleChange } = useForm<FormStateType>(initialFormState);

  const navigate = useNavigate();

  let applyReset = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      resetPassword(values)
        .then(() => localStorage.removeItem("reset"))
        .catch(() => navigate("/"));
    },
    [values, navigate]
  );
  if (!localStorage.getItem("reset")) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.formWrapper}>
      <form className={`${styles.form} mb-25`} onSubmit={applyReset}>
        <p className="text text_type_main-medium mb-2">Восстановление пароля</p>
        <PasswordInput
          name="password"
          extraClass="mb-2"
          placeholder="Введите новый пароль"
          onChange={handleChange}
          value={values.password || ""}
        />
        <Input
          extraClass="mb-2"
          name="token"
          type="text"
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={values.token || ""}
        />
        <Button
          extraClass={styles.button}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </form>
      <div>
        <span className="text text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль
        </span>
        <Link className="text text_type_main-default" to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
}
