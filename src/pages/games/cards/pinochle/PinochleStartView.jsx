import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayingCard from '../PlayingCard';
import BackButton from 'components/BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './PinochleStartView.scss';

library.add(faCirclePlus, faRightToBracket);

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
    const [view, setView] = useState('start');
    const newGameButtonHandler = () => {
        console.log("Creating a new game...");
        setView('settings');
        // Call Supabase API to create a new game and return the game ID
        // const gameID = 42;
        // navigate('../game/' + gameID);
    };
    const joinGameButtonHandler = () => {
        console.log("Joining an existing game...");
    }
    return (
        <div className="start-page">
            {/* Header title & logo */}
            <div className="nickster-text">Nickster</div>
            <div className="pinochle-text">Pinochle</div>
            <div className="card-jack"><PlayingCard suit="Diamonds" rank="Jack" /></div>
            <div className="card-queen"><PlayingCard suit="Spades" rank="Queen" /></div>
            <BackButton clickHandler={() => navigate(-1)} />
            {/* New & Join buttons */}
            <button className={`game-button new-game-button ${view !== "start" ? "fade-left" : ""}`} onClick={newGameButtonHandler}>
                <FontAwesomeIcon className="icon" icon="fa-solid fa-circle-plus" style={{ marginRight: "1vmin" }} />
                <div className="button-text-container">
                    <div className="button-text">New</div>
                    <div className="button-subtext">Start a new game</div>
                </div>
            </button>
            <button className={`game-button join-game-button ${view !== "start" ? "fade-left" : ""}`} onClick={joinGameButtonHandler}>
                <FontAwesomeIcon className="icon" icon="fa-solid fa-right-to-bracket" style={{ marginRight: "1vmin" }} />
                <div className="button-text-container">
                    <div className="button-text">Join</div>
                    <div className="button-subtext">Join an existing game</div>
                </div>
            </button>
            {/* New game settings view */}
        </div>
    );
}

export default PinochleStartView;