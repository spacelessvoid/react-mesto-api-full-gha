import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const { formValues, setFormValues, handleInputChange } = useForm({});
  const { avatar } = formValues;

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar,
    });
  }

  useEffect(() => {
    setFormValues("");
  }, [isOpen, setFormValues]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"change-avatar"}
      buttonLoading={"Сохранение..."}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text-input popup__text-input_type_avatar"
        type="url"
        name="avatar"
        id="avatar-input"
        placeholder="Ссылка на новый аватар"
        required
        value={avatar || ""}
        onChange={handleInputChange}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
