import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./home.module.css";
import { forgotPassword } from "../utils/burger-api";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
  const [email, setValue] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  let sendMail = useCallback(
    (e) => {
      e.preventDefault();
      forgotPassword(email)
        .then(() => {
          localStorage.setItem("reset", true);
          navigate("/reset-password");
        })
        .catch(() => navigate("/"));
    },
    [email, navigate]
  );

  return (
    <div className={styles.formWrapper}>
      <form className={`${styles.form} mb-25`} onSubmit={sendMail}>
        <p className="text text_type_main-medium mb-2">Восстановление пароля</p>
        <Input
          extraClass="mb-2"
          type="text"
          placeholder="Укажите e-mail"
          onChange={onChange}
          value={email}
        />
        <Button
          extraClass={styles.button}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
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
