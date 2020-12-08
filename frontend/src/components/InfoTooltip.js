import React from "react";
import PopupWithForm from "./PopupWithForm";
import unionOkImg from "../images/unionOk.svg";
import unionErrImg from "../images/unionErr.svg";

function InfoTooltip({ isOpen, onClose, Tooltip }) {
  return (
    <PopupWithForm name="tool-tip" isOpen={isOpen} onClose={onClose}>
      <img
        src={!Tooltip ? unionErrImg : unionOkImg}
        alt="лого авторизации"
        className="popup__notice-logo"
      />
      {!Tooltip ? (
        <span className="popup__notice-text">
          Что-то пошло не так! Попробуйте ещё раз.
        </span>
      ) : (
        <span className="popup__notice-text">
          Вы успешно зарегистрировались!
        </span>
      )}
    </PopupWithForm>
  );
}

export default InfoTooltip;
