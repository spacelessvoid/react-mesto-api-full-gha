import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import { api } from "../utils/Api";
import { authorize, checkToken, register } from "../utils/Auth";
import * as path from "../utils/paths";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState({ email: "" });

  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleCheckToken();

    Promise.all([
      // Fetching user profile data
      api.getUserInfo(),
      // Fetching initial cards
      api.getInitialCards(),
    ])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  // fn to reduce code duplication in functions that call api and use isLoading state
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(console.error);
  }

  function handleConfirmDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardDelete(card) {
    const makeRequest = () =>
      api.deleteCard(card._id).then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      });
    handleSubmit(makeRequest);
  }

  function handleUpdateUser(info) {
    const makeRequest = () =>
      api.updateUserInfo(info).then(newInfo => setCurrentUser(newInfo));
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(avatar) {
    const makeRequest = () =>
      api.updateUserAvatar(avatar).then(newAvatar => setCurrentUser(newAvatar));
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(card) {
    const makeRequest = () =>
      api.addNewCard(card).then(newCard => setCards([newCard, ...cards]));
    handleSubmit(makeRequest);
  }

  function handleLogin({ email }) {
    setLoggedIn(true);
    setUserEmail({ email });
  }

  function handleRegistration({ email, password }) {
    setIsLoading(true);

    register(email, password)
      .then(setIsRegistrationSuccessful(true))
      .then(() => {
        navigate(path.signIn, { replace: true });
      })
      .catch(() => {
        setIsRegistrationSuccessful(false);
        console.error();
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsLoading(false);
      });
  }

  function handleAuthorization({ email, password }) {
    const makeRequest = () =>
      authorize(email, password).then(data => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handleLogin({ email });
          navigate("/", { replace: true });
        }
      });
    handleSubmit(makeRequest);
  }

  function handleCheckToken() {
    setIsLoading(true);

    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      checkToken(jwt)
        .then(user => handleLogin(user.data))
        .then(() => navigate("/", { replace: true }))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header onSignOut={onSignOut} userEmail={userEmail} />
          <Routes>
            <Route
              path={path.signUp}
              element={<Register handleRegistration={handleRegistration} />}
            />
            <Route
              path={path.signIn}
              element={<Login handleAuthorization={handleAuthorization} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmDelete}
                  onUpdateUser={handleUpdateUser}
                  cards={cards}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onConfirmDelete={handleCardDelete}
            card={deletedCard}
          />

          <ImagePopup card={selectedCard} />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isRegistrationSuccessful}
          />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
