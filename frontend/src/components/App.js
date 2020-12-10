import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as Auth from "../utils/Auth.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import InfoTooltip from "./InfoTooltip";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(
    false
  );
  const [loggedIn, setloggedIn] = React.useState(false);
  const [Tooltip, setTooltip] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    card: {},
    isOpen: false,
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userData, setUserData] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    const promises = [api.getInitialCards(), api.getPersonInfo()];

    Promise.all(promises)
      .then(([resCard, resUser]) => {
        setCurrentUser(resUser);
        setCards(resCard);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleSubmitClick() {
    setInfoTooltipPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ card, isOpen: true });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleUpdateUser(data) {
    api
      .sendUserInformation({ name: data.name, about: data.about })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar({ avatar: data.avatar })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .likeCard(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .removelikeCard(card._id, isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(() => {
        const newCards = cards.filter((с) => с._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard({ name: data.imageName, link: data.imageLink })
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    
    if (jwt) {
      Auth.getContent(jwt).then((res) => {
        if (res) {
          setUserData({
            email: res.data.email,
          });
          setloggedIn(true);
          history.push("/");
        } else {
          localStorage.removeItem("jwt");
        }
      });
    }
  }

  function handleLogin() {
    setTooltip(true);
    tokenCheck();
  }

  function handleRegister() {
    setTooltip(true);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userData={userData} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register
              onSubmitClick={handleSubmitClick}
              handleRegister={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onSubmitClick={handleSubmitClick}
              handleLogin={handleLogin}
              Tooltip={Tooltip}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          Tooltip={Tooltip}
          loggedIn={loggedIn}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
