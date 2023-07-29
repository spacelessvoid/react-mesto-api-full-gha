import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import * as path from "../utils/paths";
import useForm from "../hooks/useForm";

function Register({ handleRegistration }) {
  const { isLoading } = useContext(AppContext);

  const { formValues, handleInputChange } = useForm({});

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      handleRegistration(formValues);
    }
  };

  return (
    <section className="welcome-form">
      <h2 className="welcome-form__title">Регистрация</h2>
      <form
        className="welcome-form__form"
        id="register"
        name="register"
        onSubmit={handleSubmit}
      >
        <input
          className="welcome-form__text-input"
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          required
          autoComplete="email"
          value={formValues.email || ""}
          onChange={handleInputChange}
        />
        <input
          className="welcome-form__text-input"
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          minLength="8"
          required
          value={formValues.password || ""}
          onChange={handleInputChange}
        />
        <button className="welcome-form__button button" type="submit">
          {isLoading ? "Обработка запроса..." : "Зарегистрироваться"}
        </button>
      </form>
      <p className="welcome-form__text">
        Уже зарегистрированы?{" "}
        <Link to={path.signIn} className="link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
