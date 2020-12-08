import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        className="popup__form-text popup__form-text_type_link"
        id="url-input"
        autoComplete="off"
        required
      />
      <span className="popup__form-text-error" id="url-input-error"></span>
      <input
        type="submit"
        value="Сохранить"
        className="popup__form-submit popup__form-submit_type_edit-avatar"
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
