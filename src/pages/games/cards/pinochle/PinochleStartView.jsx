import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import PlayingCard from '../PlayingCard';
import cardBackImage from '../images/card-back.png';
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
    const [jackFlipping, setJackFlipping] = useState(false);
    const [queenFlipping, setQueenFlipping] = useState(false);
    const flip = (isFlipping, setFlipping) => {
        if(isFlipping)
            return;
        setFlipping(true);
        setTimeout(() => {
            setFlipping(false);
        }, 500);
    };
    return (
        <div className='psv-start-page'>
            {/* Header title & logo */}
            <div className='psv-nickster-text'>Nickster</div>
            <div className='psv-subtitle-text'>Pinochle</div>
            <div className='psv-card-jack' onClick={() => flip(jackFlipping, setJackFlipping)}>
                <PlayingCard suit='Diamonds' rank='Jack' additionalClasses={`${jackFlipping ? 'pc-flipped' : ''}`} backFaceImage={cardBackImage}/>
            </div>
            <div className='psv-card-queen' onClick={() => flip(queenFlipping, setQueenFlipping)}>
                <PlayingCard suit='Spades' rank='Queen' additionalClasses={`${queenFlipping ? 'pc-flipped' : ''}`} backFaceImage={cardBackImage}/>
            </div>
            {/* New & Join buttons */}
            <button className={`psv-game-button psv-new-game-button ${view === 'start' ? 'psv-fade-in' : 'psv-fade-out'}`} onClick={() => setView('new')}>
                <FontAwesomeIcon className='icon' icon='fa-solid fa-circle-plus' style={{ marginRight: '1vmin' }} />
                <div className='psv-button-text-container'>
                    <div className='psv-button-text'>New</div>
                    <div className='psv-button-subtext'>Start a new game</div>
                </div>
            </button>
            <button className={`psv-game-button psv-join-game-button ${view === 'start' ? 'psv-fade-in' : 'psv-fade-out'}`} onClick={() => setView('join')}>
                <FontAwesomeIcon className='icon' icon='fa-solid fa-right-to-bracket' style={{ marginRight: '1vmin' }} />
                <div className='psv-button-text-container'>
                    <div className='psv-button-text'>Join</div>
                    <div className='psv-button-subtext'>Join an existing game</div>
                </div>
            </button>
            {/* New game settings view */}
            {view === 'new' && <div className={`psv-rules-container ${view === 'new' ? 'psv-fade-in' : 'psv-fade-out'}`}>
                <div className='psv-rules-title'>Game Rules</div>
            </div>}
            {/* Join existing game view */}
            
        </div>
    );
}

export default PinochleStartView;