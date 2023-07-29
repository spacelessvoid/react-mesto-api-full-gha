import { useEffect } from "react";

export default function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return;

    function handleClick(evt) {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        closePopup();
      }
    }

    function handleUserEscKeyPress(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }

    document.addEventListener("keydown", handleUserEscKeyPress);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleUserEscKeyPress);
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, closePopup]);
}
