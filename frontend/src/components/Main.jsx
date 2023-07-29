import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsList = cards.map(card => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль пользователя">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Фото пользователя"
            className="profile__avatar"
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button
          className="profile__add-btn add-btn button"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery" aria-label="Галерея изображений">
        {cardsList}
      </section>
    </main>
  );
}
