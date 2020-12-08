import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function Header({ userData, loggedIn }) {
  const history = useHistory();
  const { pathname } = useLocation();

  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      {loggedIn ? (
        <>
          {" "}
          <p className="header__email-name">{userData.email}</p>{" "}
          <a
            href="/"
            onClick={signOut}
            className="header__link header__link_type_out"
          >
            Выйти
          </a>{" "}
        </>
      ) : pathname === "/sign-in" ? (
        <Link to={"/sign-up"} className="header__link">
          Регистрация
        </Link>
      ) : (
        <Link to={"/sign-in"} className="header__link">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
