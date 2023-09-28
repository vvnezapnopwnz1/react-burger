import React, { useCallback, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { loginUser } from "../services/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

export function LoginPage() {
  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userData);

  let login = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(loginUser(form));
    },
    [form, dispatch]
  );

  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className={styles.formWrapper}>
      <form className={`${styles.form} mb-25`}>
        <p className="text text_type_main-medium mb-2">Вход</p>
        <Input
          onChange={onChange}
          extraClass="mb-2"
          type="text"
          placeholder="E-mail"
          name="email"
          value={form.email}
        />
        <PasswordInput
          onChange={onChange}
          name={"password"}
          extraClass="mb-2"
          value={form.password}
        />
        <Button
          onClick={login}
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={styles.button}
        >
          Войти
        </Button>
      </form>
      <div>
        <span className="text text_type_main-default text_color_inactive mr-1">
          Вы новый пользователь?
        </span>
        <Link className="text text_type_main-default" to="/register">
          Зарегестрироваться
        </Link>
      </div>
      <div>
        <span className="text text_type_main-default text_color_inactive mr-2">
          Забыли пароль
        </span>
        <Link className="text text_type_main-default" to="/forgot-password">
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}
