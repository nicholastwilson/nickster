import { useNavigate } from 'react-router-dom';
import PlayingCard from '../PlayingCard';
import BackButton from 'components/BackButton';
import './PinochleStartView.scss';

/*
    Creating a new game:
    1) User is prompted to select game parameters
    2) A Supabase API call is made to create a new game based on the parameters
    3) If successful, user is navigated to .../pinochle/game/${gameID}
    4) If unsuccessful, user is presented with an error

    Joining an existing game:
    1) User is prompted for the existing game ID
    2) User is navigated to .../pinochle/game/${gameID}

    Go back to Games page
*/
function PinochleStartView() {
    const navigate = useNavigate();
    const newGameButtonHandler = () => {
        console.log("Creating a new game...");
        // Call Supabase API to create a new game and return the game ID
        const gameID = 42;
        navigate('/pinochle/game/' + gameID);
    };
    return (
        <div className="start-page">
            <div className="card-jack"><PlayingCard suit="Diamonds" rank="Jack" /></div>
            <div className="card-queen"><PlayingCard suit="Spades" rank="Queen" /></div>
            <div className="nickster-text">Nickster</div>
            <div className="pinochle-text">Pinochle</div>
            <BackButton clickHandler={() => navigate(-1)} />
            <button className="new-game-button" onClick={newGameButtonHandler}>New Game</button>
        </div>
    );
}

export default PinochleStartView;