import logo from '../assets/wordle-log.png';

export default function Header() {
    return (
        <header className="game-header">
            <img src={logo} alt=""  className="logo"/>
            <h1 className="game-header__heading">Wordle</h1>
            <nav className="game-header__nav">
                <ul className="game-header__list">
                    <li className="game-header__list-item">HighScores</li>
                    <li className="game-header__list-item">About us</li>
                    <li className="game-header__list-item">Home</li>
                </ul>
            </nav>
        </header>
    )
}