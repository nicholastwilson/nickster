import { useNavigate } from 'react-router-dom';
import './PinochleStartView.scss';

function PinochleStartView() {
    const navigate = useNavigate();
    const newGameButtonHandler = () => {
        alert("New Game!");
        /* Call Supabase API to create a new game and return the game ID */
        const gameID = 42;
        navigate('/pinochle/game/' + gameID);
    };
    return (
        <div className="start-page">
            <div className="title-text">Nickster Pinochle</div>
            <div className="new-game-button" onClick={newGameButtonHandler}>New Game</div>
        </div>
    );
}

export default PinochleStartView;