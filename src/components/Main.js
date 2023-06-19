import {useEffect, useState} from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {

    const [userName, changeName] = useState();
    const [userDescription, changeDescription] = useState();
    const [userAvatar, changeAvatar] = useState();
    const [cards, changeCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getAllCards()])
            .then(([userRes, cardRes]) => {
                changeName(userRes.name);
                changeDescription(userRes.about);
                changeAvatar(userRes.avatar);
                changeCards(cardRes);
            })
    }, [])

    return (
        <main>
            <section className="profile page__profile">
                <button type="submit" className="profile__avatar-button" onClick={props.onEditAvatar}>
                    <img src={userAvatar} alt="Аватарка" className="profile__avatar"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit" onClick={props.onEditProfile}></button>
                    <p className="profile__text">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements page__elements">
                {cards.map(item => {
                    return (<Card key={item._id} cardData={item} fullImageOpen={props.onCardClick}/>)
                })}
            </section>
        </main>
    )
}


export default Main;