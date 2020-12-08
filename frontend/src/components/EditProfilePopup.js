import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        value={name || ""}
        onChange={handleChangeName}
        className="popup__form-text popup__form-text_type_name"
        id="name-input"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        required
      />
      <span className="popup__form-text-error" id="name-input-error"></span>
      <input
        type="text"
        name="job"
        value={description || ""}
        onChange={handleChangeDescription}
        className="popup__form-text popup__form-text_type_job"
        id="job-input"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        required
      />
      <span className="popup__form-text-error" id="job-input-error"></span>
      <input type="submit" value="Сохранить" className="popup__form-submit" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
