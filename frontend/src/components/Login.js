import React from "react";
import { useHistory } from "react-router-dom";
import * as Auth from "../utils/Auth.js";

function Login({ onSubmitClick, handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const escape = require("escape-html");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function submitClick() {
    setTimeout(onSubmitClick, 1000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    Auth.authorize(escape(email), escape(password))
      .then((data) => {
        if (data.token) {
          handleLogin();
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      <h3 className="login__title">Вход</h3>
      <form onSubmit={handleSubmit} className="login__form">
        <fieldset className="login__form-set">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Email"
            className="login__form-text login__form-text_type_title"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="Пароль"
            className="login__form-text login__form-text_type_password"
            required
          />
          <input
            type="submit"
            value="Войти"
            onClick={submitClick}
            className="login__form-submit"
          />
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
