import React, { useCallback, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./home.module.css";
import { registerUser } from "../services/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

export function RegisterPage() {
  const [form, setValue] = useState({ email: "", password: "", name: "" });
  const user = useSelector((state) => state.auth.userData);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  let register = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(registerUser(form));
    },
    [form, dispatch]
  );
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className={styles.formWrapper}>
      <form className={`${styles.form} mb-25`}>
        <p className="text text_type_main-medium mb-2">Регистрация</p>
        <Input
          onChange={onChange}
          extraClass="mb-2"
          type="text"
          placeholder="Имя"
          name="name"
          value={form.name}
        />
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
          onClick={register}
          extraClass={styles.registerButton}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Зарегистрироваться
        </Button>
      </form>
      <div>
        <span className="text text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
        </span>
        <Link className="text text_type_main-default" to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
}
