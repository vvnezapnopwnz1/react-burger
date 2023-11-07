import React, { useCallback, useEffect, SyntheticEvent } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { loginUser } from "../services/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { AppDispatch, RootState } from "../services/reducers";

export function LoginPage() {
  const { values, handleChange } = useForm({});
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(location?.state?.from || "/", { replace: true });
    }
  }, [location?.state?.from, navigate, user]);

  const dispatch = useDispatch<AppDispatch>();

  let login = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      dispatch(loginUser(values));
    },
    [values, dispatch]
  );
  if (user) {
    return <Navigate to={location?.state?.from || "/"} />;
  }
  return (
    <div className={styles.formWrapper}>
      <form
        className={`${styles.form} mb-25`}
        onSubmit={(e: SyntheticEvent) => login(e)}
      >
        <p className="text text_type_main-medium mb-2">Вход</p>
        <Input
          onChange={handleChange}
          extraClass="mb-2"
          type="text"
          placeholder="E-mail"
          name="email"
          value={values.email || ""}
        />
        <PasswordInput
          onChange={handleChange}
          name={"password"}
          extraClass="mb-2"
          value={values.password || ""}
        />
        <Button
          type="primary"
          size="medium"
          extraClass={styles.button}
          htmlType="submit"
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
