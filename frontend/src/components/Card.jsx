import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card: { _id, link, name, likes, owner },
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;

  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `button card__like-btn ${
    isLiked && "card__like-btn_active"
  }`;

  function handleClick() {
    onCardClick({ link, name });
  }

  function handleLikeClick() {
    onCardLike({ _id, likes });
  }

  function handleDeleteClick() {
    onCardDelete({ _id });
  }

  return (
    <article className="gallery__card card" id={_id}>
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="card__delete-btn button"
          type="button"
          aria-label="Удалить фото"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__info">
        <h2 className="card__place">{name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Сердечко"
          onClick={handleLikeClick}
        ></button>
        <div className="card__like-count">{likes.length}</div>
      </div>
    </article>
  );
}
