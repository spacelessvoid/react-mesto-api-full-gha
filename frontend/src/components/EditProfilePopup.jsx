import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

export default function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { formValues, setFormValues, handleInputChange } = useForm({});
  const { name, about } = formValues;

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  }

  useEffect(() => {
    setFormValues(currentUser);
  }, [currentUser, isOpen, setFormValues]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile"}
      buttonLoading={"Сохранение..."}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text-input popup__text-input_type_name"
        type="text"
        name="name"
        id="name-input"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleInputChange}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        className="popup__text-input popup__text-input_type_job"
        type="text"
        name="about"
        id="job-input"
        placeholder="Введите краткое описание о себе"
        minLength="2"
        maxLength="200"
        required
        value={about || ""}
        onChange={handleInputChange}
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}
