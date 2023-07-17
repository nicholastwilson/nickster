import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import PlayingCard from '../PlayingCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './PinochleStartView.scss';

library.add(faCirclePlus, faRightToBracket);

/*
    Creating a new game:
    1) User is prompted to select game parameters
    2) A Supabase API call is made to create a new game based on the parameters
    3) If successful, user is navigated to ./game/${gameID}
    4) If unsuccessful, user is presented with an error message

    Joining an existing game:
    1) User is prompted for the existing game ID
    2) User is navigated to .../pinochle/game/${gameID}

    Go back to Games page
*/
function PinochleStartView() {
    // const navigate = useNavigate();
    const [view, setView] = useState('start');
    return (
        <div className='psv-start-page'>
            {/* Header title & logo */}
            <div className='psv-nickster-text'>Nickster</div>
            <div className='psv-subtitle-text'>Pinochle</div>
            <PlayingCard suit='Diamonds' rank='Jack' additionalClasses='psv-card-jack'/>
            <PlayingCard suit='Spades' rank='Queen' additionalClasses='psv-card-queen'/>
            {/* New & Join buttons */}
            <button className={`psv-game-button psv-new-game-button ${view !== 'start' ? 'psv-fade-out' : ''} no-select`} onClick={() => setView('new')}>
                <FontAwesomeIcon className='icon' icon='fa-solid fa-circle-plus' style={{ marginRight: '1vmin' }} />
                <div className='psv-button-text-container'>
                    <div className='psv-button-text'>New</div>
                    <div className='psv-button-subtext'>Start a new game</div>
                </div>
            </button>
            <button className={`psv-game-button psv-join-game-button ${view !== 'start' ? 'psv-fade-out' : ''} no-select`} onClick={() => setView('join')}>
                <FontAwesomeIcon className='icon' icon='fa-solid fa-right-to-bracket' style={{ marginRight: '1vmin' }} />
                <div className='psv-button-text-container'>
                    <div className='psv-button-text'>Join</div>
                    <div className='psv-button-subtext'>Join an existing game</div>
                </div>
            </button>
            {/* New game settings view */}
        </div>
    );
}

export default PinochleStartView;