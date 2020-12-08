import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={
        props.card.isOpen
          ? `popup popup_opened popup_type_full-image`
          : `popup popup_type_full-image`
      }
    >
      <div className="popup__container popup__container_type_full-image">
        <img
          className="popup__full-image"
          src={props.card.card.link}
          alt={props.card.card.name}
        />
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title popup__title_type_full-image">
          {props.card.card.name}
        </h3>
      </div>
    </section>
  );
}

export default ImagePopup;
