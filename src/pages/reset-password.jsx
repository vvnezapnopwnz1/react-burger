import React, { useCallback, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./home.module.css";
import { resetPassword } from "../utils/burger-api";

export function ResetPasswordPage() {
  const [form, setValue] = useState({ token: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let applyReset = useCallback(
    (e) => {
      e.preventDefault();
      resetPassword(form);
    },
    [form]
  );

  return (
    <div className={styles.formWrapper}>
      <form className={`${styles.form} mb-25`}>
        <p className="text text_type_main-medium mb-2">Восстановление пароля</p>
        <PasswordInput
          name="password"
          extraClass="mb-2"
          placeholder="Введите новый пароль"
          onChange={onChange}
          value={form.password}
        />
        <Input
          extraClass="mb-2"
          name="token"
          type="text"
          placeholder="Введите код из письма"
          onChange={onChange}
          value={form.token}
        />
        <Button
          extraClass={styles.button}
          htmlType="button"
          type="primary"
          size="medium"
          onClick={applyReset}
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
