import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useState} from "react";

function App() {

    const [isAvatarPopupOpened, changeAvatarState] = useState(false);
    const [isEditProfileOpened, changeProfileState] = useState(false);
    const [isAddPlacePopupOpened, changePlaceState] = useState(false);
    const [isImagePopupOpened, changeImagePopupState] = useState(false);
    const [currentCard, changeCurrentCard] = useState({})

    function closeAllPopups() {
        changeAvatarState(false);
        changeProfileState(false);
        changePlaceState(false);
        changeImagePopupState(false)
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

    return (
        <>
            <Header/>
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
            <Footer/>

            <PopupWithForm name="profile-edit"
                           title="Редактировать профиль"
                           buttonName="Сохранить"
                           isOpened={isEditProfileOpened}
                           onClose={closeAllPopups}>
                <fieldset className="edit-form__input-field">
                    <input type="text" name="name" placeholder="Имя" id="profile-name-input"
                           className="edit-form__input edit-form__input_value_name" required
                           minLength="2"
                           maxLength="40"/>
                    <span className="edit-form__validation-error" id="profile-name-input-error"></span>
                    <input type="text" name="info" placeholder="Род занятий" id="profile-job-input"
                           className="edit-form__input edit-form__input_value_job" required minLength="2"
                           maxLength="200"/>
                    <span className="edit-form__validation-error" id="profile-job-input-error"></span>
                </fieldset>
            </PopupWithForm>

            <PopupWithForm name="add-card"
                           title="Новое место"
                           buttonName="Создать"
                           isOpened={isAddPlacePopupOpened}
                           onClose={closeAllPopups}>
                <fieldset className="edit-form__input-field">
                    <input type="text" name="name" placeholder="Название" id="picture-name-input"
                           className="edit-form__input edit-form__input_value_card-name" required
                           minLength="2"
                           maxLength="30"/>
                    <span className="edit-form__validation-error" id="picture-name-input-error"></span>
                    <input type="url" name="link" placeholder="Ссылка на картинку"
                           id="picture-link-input"
                           className="edit-form__input edit-form__input_value_image-src" required/>
                    <span className="edit-form__validation-error" id="picture-link-input-error"></span>
                </fieldset>
            </PopupWithForm>

            <PopupWithForm name="confirm" title="Вы уверены?" buttonName="Да"/>

            <PopupWithForm name="update-avatar"
                           title="Обновить аватар"
                           buttonName="Сохранить"
                           isOpened={isAvatarPopupOpened}
                           onClose={closeAllPopups}>
                <fieldset className="edit-form__input-field">
                    <input type="url" name="avatar" placeholder="Ссылка на аватар"
                           id="change-avatar-input"
                           className="edit-form__input edit-form__input_value_change-avatar" required/>
                    <span className="edit-form__validation-error" id="change-avatar-input-error"></span>
                </fieldset>
            </PopupWithForm>

            <ImagePopup isOpened={isImagePopupOpened} currentCard={currentCard} onClose={closeAllPopups}/>
        </>
    );
}

export default App;
