import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

export default function AddPlacePopup({ isOpen, onAddPlace }) {
  const { formValues, setFormValues, handleInputChange } = useForm({});
  const { name, link } = formValues;

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setFormValues({});
  }, [isOpen, setFormValues]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-image"}
      buttonLoading={"Сохранение..."}
      buttonText={"Создать"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text-input popup__text-input_type_title"
        type="text"
        name="name"
        id="title-input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name || ""}
        onChange={handleInputChange}
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        className="popup__text-input popup__text-input_type_link"
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleInputChange}
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}
