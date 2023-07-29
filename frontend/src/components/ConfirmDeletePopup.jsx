import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup({ isOpen, onConfirmDelete, card }) {
  function handleSubmit(e) {
    e.preventDefault();

    onConfirmDelete(card);
  }

  return (
    <PopupWithForm
      title={"Вы уверены?"}
      name={"confirm-delete"}
      buttonLoading={"Удаление..."}
      buttonText={"Да, удалить карточку"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
}
