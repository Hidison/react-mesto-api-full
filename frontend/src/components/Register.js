import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Auth from "../utils/Auth.js";

function Register({ onSubmitClick, handleRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const escape = require("escape-html");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    console.log(email);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    console.log(password);
  }

  function submitClick() {
    setTimeout(onSubmitClick, 500);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Auth.register(escape(email), escape(password))
      .then((res) => {
        if (JSON.stringify(res.data.email)) {
          console.log(res);
          console.log(JSON.stringify(res.data.email));
          handleRegister();
          history.push("/sign-in");
        } else {
          throw new Error("Что-то пошло не так!");
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации пользователя: ${err}`);
      });
  }

  return (
    <div className="login">
      <h3 className="login__title">Регистрация</h3>
      <form onSubmit={handleSubmit} className="login__form">
        <fieldset className="login__form-set">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChangeEmail}
            className="login__form-text login__form-text_type_title"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Пароль"
            onChange={handleChangePassword}
            className="login__form-text login__form-text_type_password"
            required
          />
          <input
            type="submit"
            onClick={submitClick}
            value="Зарегистрироваться"
            className="login__form-submit"
          />
        </fieldset>
      </form>
      <div className="login__signup">
        <p className="login__signup-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login__signup-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
