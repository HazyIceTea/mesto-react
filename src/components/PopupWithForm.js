function PopupWithForm (props){
    return (
        <div className= {`popup popup_event_${props.name} ${props.isOpened && "popup_opened"}`}>
            <div className="popup__container">
                <form name={props.name} className={`edit-form edit-form_event_${props.name}`} noValidate>
                    <h2 className="edit-form__title">{props.title}</h2>
                    {props.child}
                    <button type="submit" className="edit-form__save-button edit-form__save-button_disabled"
                            disabled>{props.buttonName}
                    </button>
                </form>
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;