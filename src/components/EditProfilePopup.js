import PopupWithForm from "./PopupWithForm";
import {useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup ({isOpened, onClose, onUpdateUser }){
    const [name, changeName] = useState('');
    const [description, changeDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        changeName(currentUser.name);
        changeDescription(currentUser.about);
    }, [currentUser]);

    function handleName(evt){
        changeName(evt.target.value);
    }

    function handleDescription(evt){
        changeDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: name,
            info: description,
        });
    }

    return(
        <PopupWithForm name="profile-edit"
                       title="Редактировать профиль"
                       buttonName="Сохранить"
                       isOpened={isOpened}
                       onClose={onClose}
                       onSubmit={handleSubmit}>
            <fieldset className="edit-form__input-field">
                <input type="text" name="name" placeholder="Имя" id="profile-name-input"
                       className="edit-form__input edit-form__input_value_name" required
                       minLength="2"
                       maxLength="40" defaultValue={name}  onChange={handleName}/>
                <span className="edit-form__validation-error" id="profile-name-input-error"></span>
                <input type="text" name="info" placeholder="Род занятий" id="profile-job-input"
                       className="edit-form__input edit-form__input_value_job" required minLength="2"
                       maxLength="200" defaultValue={description} onChange={handleDescription}/>
                <span className="edit-form__validation-error" id="profile-job-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;