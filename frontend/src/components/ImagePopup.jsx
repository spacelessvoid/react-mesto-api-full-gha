import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import usePopupClose from "../hooks/usePopupClose";

export default function ImagePopup({ card }) {
  const [image, setImage] = useState({ link: "", name: "" });

  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(card, closeAllPopups);

  function onImageLoad({ target: img }) {
    setImage({ link: img.src, name: img.alt });
  }

  return (
    <div
      className={`popup popup_bg-opacity_darker ${card && "popup_opened"}`}
      id="popup-zoom-image"
    >
      <div className="popup__zoom-container">
        <button
          className="popup__close button"
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <figure className="popup__figure">
          {card ? (
            <Image link={card?.link} name={card?.name} onLoad={onImageLoad} />
          ) : (
            <Image link={image.link} name={image.name} />
          )}
        </figure>
      </div>
    </div>
  );
}

const Image = ({ link, name, onLoad }) => (
  <>
    <img
      src={link}
      alt={name}
      className="popup__image-zoomed"
      onLoad={onLoad}
    />
    <figcaption className="popup__caption">{name}</figcaption>
  </>
);
