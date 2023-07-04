import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function AddCardPopup ({isOpened, onClose, onAddPlace}) {

    const [cardName, changeCardName] = useState('');
    const [cardLink, changeCardLink] = useState('');

    function handleName(evt){
        changeCardName(evt.target.value);
    }

    function handleLink(evt){
        changeCardLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({name: cardName, link: cardLink});
    }
    return(
        <PopupWithForm name="add-card"
                       title="Новое место"
                       buttonName="Создать"
                       isOpened={isOpened}
                       onClose={onClose}
                       onSubmit={handleSubmit}>
            <fieldset className="edit-form__input-field">
                <input type="text" name="name" placeholder="Название" id="picture-name-input"
                       className="edit-form__input edit-form__input_value_card-name" required
                       minLength="2"
                       maxLength="30" onChange={handleName}/>
                <span className="edit-form__validation-error" id="picture-name-input-error"></span>
                <input type="url" name="link" placeholder="Ссылка на картинку"
                       id="picture-link-input"
                       className="edit-form__input edit-form__input_value_image-src" required onChange={handleLink}/>
                <span className="edit-form__validation-error" id="picture-link-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddCardPopup;