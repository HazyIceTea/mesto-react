function Card(props) {
    return (
        <article className="element">
            <img className="element__image" alt={props.cardData.name} src={props.cardData.link}
                 onClick={() => {
                     props.fullImageOpen({name: props.cardData.name, link: props.cardData.link})
                 }}/>
            <h2 className="element__name">{props.cardData.name}</h2>
            <button className="element__button-delete"></button>
            <div>
                <button type="button" className="element__like-button"></button>
                <p className="element__like-button-counter">{props.cardData.likes.length}</p>
            </div>
        </article>
    )
}

export default Card;