import { useContext } from "react";
import success from "../images/register-success.svg";
import fail from "../images/register-fail.svg";
import { AppContext } from "../contexts/AppContext";
import usePopupClose from "../hooks/usePopupClose";

function InfoTooltip({ isOpen, isSuccess }) {
  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div
      className={"popup" + (isOpen ? " popup_opened" : "")}
      id={`popup-info`}
    >
      <div className="popup__container">
        <button
          className="popup__close button"
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <img
          className="popup__tooltip-image"
          src={isSuccess ? success : fail}
          alt=""
        />
        <h2 className="popup__title popup__title_centered">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
