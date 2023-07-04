import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React, {useEffect, useState} from "react";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";

function App() {

    const [isAvatarPopupOpened, changeAvatarState] = useState(false);
    const [isEditProfileOpened, changeProfileState] = useState(false);
    const [isAddPlacePopupOpened, changePlaceState] = useState(false);
    const [isImagePopupOpened, changeImagePopupState] = useState(false);
    const [currentCard, changeCurrentCard] = useState({});
    const [currentUser, changeCurrentUser] = useState({});

    const [cards, changeCards] = useState([]);

    useEffect(() => {
        api.getAllCards()
            .then(res => changeCards(res))
            .catch(err => console.error(`Ошибка при загрузке начальных данных страницы ${err}`))
    }, [])


    useEffect(() => {
        api.getUserInfo()
            .then(res => changeCurrentUser(res));
    }, [])

    function closeAllPopups() {
        changeAvatarState(false);
        changeProfileState(false);
        changePlaceState(false);
        changeImagePopupState(false);
    }

    function handleEditAvatarClick() {
        changeAvatarState(true);
    }

    function handleEditProfileClick() {
        changeProfileState(true);
    }

    function handleAddPlaceClick() {
        changePlaceState(true);
    }

    function handleCardClick(data) {
        changeImagePopupState(true);
        changeCurrentCard(data);
    }

    function handleUpdateUser(userData) {
        api.sendUserInfo(userData)
            .then(res => {
                changeCurrentUser(res);
                closeAllPopups()
            })
            .catch(err => console.error(`Ошибка изменения профиля ${err}`))
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then(res => {
                changeCurrentUser(res);
                closeAllPopups()
            })
            .catch(err => console.error(`Ошибка смены аватара ${err}`))
    }

    function handleAddCardSubmit(cardData) {
        api.sendCard(cardData)
            .then(res => {
                changeCards([res, ...cards]);
                closeAllPopups()
            })
            .catch(err => console.error(`Ошибка отправки карточки ${err}`))
    }


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.likeCard(card._id)
                .then((newCard) => {
                    changeCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.error(`Ошибка обработки лайка карточки ${err}`))
        } else {
            api.dislikeCard(card._id)
                .then((newCard) => {
                    changeCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.error(`Ошибка обработки лайка карточки ${err}`))
        }

    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                changeCards(cards.filter(item => {
                    return item._id !== card._id
                }))
            })
            .catch(err => console.error(`Ошибка удаления карточки ${err}`))

    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header/>
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards}
                  onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
            <Footer/>

            <EditProfilePopup isOpened={isEditProfileOpened} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

            <AddCardPopup isOpened={isAddPlacePopupOpened} onClose={closeAllPopups} onAddPlace={handleAddCardSubmit}/>

            <PopupWithForm name="confirm" title="Вы уверены?" buttonName="Да"/>

            <EditAvatarPopup isOpened={isAvatarPopupOpened} onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar}/>

            <ImagePopup isOpened={isImagePopupOpened} currentCard={currentCard} onClose={closeAllPopups}/>
        </CurrentUserContext.Provider>
    );
}

export default App;
