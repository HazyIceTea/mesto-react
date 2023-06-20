import {useEffect, useState} from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({onCardClick, onEditAvatar, onEditProfile, onAddPlace}) {

    const [userName, changeName] = useState('');
    const [userDescription, changeDescription] = useState('');
    const [userAvatar, changeAvatar] = useState('');
    const [cards, changeCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getAllCards()])
            .then(([userRes, cardRes]) => {
                changeName(userRes.name);
                changeDescription(userRes.about);
                changeAvatar(userRes.avatar);
                changeCards(cardRes);
            })
            .catch(err => console.error(`Ошибка при загрузке начальных данных страницы ${err}`))
    }, [])

    const cardElements = cards.map(item => {
        return (<Card key={item._id} cardData={item} onCardClick={onCardClick}/>)
    })

    return (
        <main>
            <section className="profile page__profile">
                <button type="submit" className="profile__avatar-button" onClick={onEditAvatar}>
                    <img src={userAvatar} alt="Аватарка" className="profile__avatar"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit" onClick={onEditProfile}></button>
                    <p className="profile__text">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements page__elements">
                {cardElements}
            </section>
        </main>
    )
}


export default Main;