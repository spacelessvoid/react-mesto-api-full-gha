import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import usePopupClose from "../hooks/usePopupClose";

export default function PopupWithForm({
  title,
  name,
  buttonText,
  buttonLoading,
  children,
  isOpen,
  onSubmit,
}) {
  const { isLoading, closeAllPopups } = useContext(AppContext);

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div
      className={"popup" + (isOpen ? " popup_opened" : "")}
      id={`popup-${name}`}
    >
      <div className="popup__container">
        <button
          className="popup__close button"
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>

        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          id={`${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button button" type="submit">
            {isLoading ? buttonLoading : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
