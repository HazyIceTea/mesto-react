function PopupWithForm ({isOpened, children, name, title, buttonName, onClose}){
    return (
        <div className= {`popup popup_event_${name} ${isOpened? "popup_opened": ""}`}>
            <div className="popup__container">
                <form name={name} className={`edit-form edit-form_event_${name}`} noValidate>
                    <h2 className="edit-form__title">{title}</h2>
                    {children}
                    <button type="submit" className="edit-form__save-button edit-form__save-button_disabled"
                            disabled>{buttonName}
                    </button>
                </form>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;