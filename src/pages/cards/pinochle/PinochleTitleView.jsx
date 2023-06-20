import './PinochleTitleView.scss';

export default function PinochleTitleView() {
    return (
        <div className="title-page">
            <div className="title-text">Nickster Pinochle</div>
            <div className="new-game-button" onClick={hanldeNewGame}>New Game</div>
        </div>
    );
}

function hanldeNewGame() {
    alert("[PinochleGame.hanldeNewGame]");
}