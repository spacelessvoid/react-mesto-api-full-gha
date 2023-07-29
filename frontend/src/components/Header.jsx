import { Routes, Route, Link } from "react-router-dom";
import * as path from "../utils/paths";
import logo from "../images/logo.svg";

export default function Header({ onSignOut, userEmail }) {
  const { email } = userEmail;

  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Routes>
        <Route
          path={path.signUp}
          element={
            <Link className="link" to={path.signIn}>
              Войти
            </Link>
          }
        />
        <Route
          path={path.signIn}
          element={
            <Link className="link" to={path.signUp}>
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <span className="header__user-info">{email}</span>
              <Link
                onClick={handleSignOut}
                className="link"
                to={path.signIn}
                replace
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
