import logo from "../images/mesto-logo.svg";

function Header(){
    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип Место" className="header__logo" />
        </header>
    )
}

export default Header;