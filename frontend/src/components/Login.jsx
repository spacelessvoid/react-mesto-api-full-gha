import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { BarLoader } from "react-spinners";
import useForm from "../hooks/useForm";

function Login({ handleAuthorization }) {
  const { isLoading } = useContext(AppContext);

  const { formValues, handleInputChange } = useForm({});

  const handleSubmit = e => {
    e.preventDefault();
    handleAuthorization(formValues);
  };

  const override = {
    display: "block",
    margin: "50px auto",
  };

  return isLoading ? (
    <BarLoader
      cssOverride={override}
      color={"gray"}
      loading={isLoading}
      aria-label="Loading Spinner"
    />
  ) : (
    <section className="welcome-form">
      <h2 className="welcome-form__title">Вход</h2>
      <form
        className="welcome-form__form"
        id="login"
        name="login"
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
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
