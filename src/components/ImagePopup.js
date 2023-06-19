function ImagePopup(props) {
    return (
        <div className={`popup popup_event_open-picture ${props.isOpened && "popup_opened"}`}>
            <div className="popup__container popup__container_type_picture">
                <img className="popup__image-full" src={props.currentCard.link} alt={props.currentCard.name}/>
                <h2 className="popup__image-title">{props.currentCard.name}</h2>
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;