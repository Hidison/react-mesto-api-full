export const popupEditProfile = ".popup_type_edit-profile";
export const popupAddCard = ".popup_type_add-card";
export const popupElementFullImage = ".popup_type_full-image";
export const popupDelCard = ".popup_type_del-card";
export const popupEditAvatar = ".popup_type_edit-avatar";

export const editProfileFormElement = document
  .querySelector(popupEditProfile)
  .querySelector(".popup__form");
export const addCardFormElement = document
  .querySelector(popupAddCard)
  .querySelector(".popup__form");
export const editAvatarFormElement = document
  .querySelector(popupEditAvatar)
  .querySelector(".popup__form");

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const addCardButton = document.querySelector(".button_add-card");
export const profileAvatar = document.querySelector(".profile__avatar-icon");

export const userName = document.querySelector(".profile__title");
export const userJob = document.querySelector(".profile__subtitle");

export const elements = ".elements";

export const keyCodeEsc = 27;

export const defultConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-text",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__form-text_type_error",
  errorClass: "popup__form-text-error_active",
};
