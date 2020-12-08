import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  AddPlacePopup.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onAddPlace: PropTypes.func.isRequired,
  };

  const [imageName, setImageName] = React.useState("");
  const [imageLink, setImageLink] = React.useState("");

  function handleChangeimageName(e) {
    setImageName(e.target.value);
  }

  function handleChangeimageLink(e) {
    setImageLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      imageName,
      imageLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        value={imageName}
        placeholder="Название"
        onChange={handleChangeimageName}
        className="popup__form-text popup__form-text_type_title"
        id="title-input"
        minLength="1"
        maxLength="30"
        autoComplete="off"
        required
      />
      <span className="popup__form-text-error" id="title-input-error"></span>
      <input
        type="url"
        name="link"
        value={imageLink}
        placeholder="Ссылка на картинку"
        onChange={handleChangeimageLink}
        className="popup__form-text popup__form-text_type_link"
        id="url-input"
        autoComplete="off"
        required
      />
      <span className="popup__form-text-error" id="url-input-error"></span>
      <input
        type="submit"
        value="Создать"
        className="popup__form-submit popup__form-submit_type_add-card"
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
