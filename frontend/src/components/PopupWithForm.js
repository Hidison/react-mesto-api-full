import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={
        props.isOpen
          ? `popup popup_opened popup_type_${props.name}`
          : `popup popup_type_${props.name}`
      }
    >
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h3 className={`popup__title popup__title_type_${props.name}`}>
          {props.title}
        </h3>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <fieldset className="popup__form-set">{props.children}</fieldset>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
