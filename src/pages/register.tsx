import React, { SyntheticEvent, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./home.module.css";
import { registerUser } from "../services/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { AppDispatch } from "../services/reducers";

type FormStateType = {
  name: string;
  email: string;
  password: string;
};

const initialFormState: FormStateType = {
  name: "",
  email: "",
  password: "",
};

export function RegisterPage() {
  const { values, handleChange } = useForm<FormStateType>(initialFormState);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  let register = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(registerUser(values))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((e) => console.log(e));
    },
    [dispatch, values, navigate]
  );

  return (
    <div className={styles.formWrapper}>
      <form className={`${styles.form} mb-25`} onSubmit={register}>
        <p className="text text_type_main-medium mb-2">Регистрация</p>
        <Input
          onChange={handleChange}
          extraClass="mb-2"
          type="text"
          placeholder="Имя"
          name="name"
          value={values.name}
        />
        <Input
          onChange={handleChange}
          extraClass="mb-2"
          type="text"
          placeholder="E-mail"
          name="email"
          value={values.email}
        />
        <PasswordInput
          onChange={handleChange}
          name={"password"}
          extraClass="mb-2"
          value={values.password}
        />
        <Button
          extraClass={styles.registerButton}
          htmlType="submit"
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
