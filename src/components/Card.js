function Card({cardData,onCardClick}) {
    return (
        <article className="element">
            <img className="element__image" alt={cardData.name} src={cardData.link}
                 onClick={() => {
                     onCardClick(cardData)
                 }}/>
            <h2 className="element__name">{cardData.name}</h2>
            <button className="element__button-delete"></button>
            <div>
                <button type="button" className="element__like-button"></button>
                <p className="element__like-button-counter">{cardData.likes.length}</p>
            </div>
        </article>
    )
}

export default Card;