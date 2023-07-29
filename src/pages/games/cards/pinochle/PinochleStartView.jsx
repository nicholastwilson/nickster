import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faRightToBracket, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Supabase from 'features/storage/Supabase';
import PlayingCard from '../PlayingCard';
import cardBackImage from 'assets/images/games/cards/card-back.png';

import './PinochleStartView.scss';

function PinochleStartView() {
    const navigate = useNavigate();
    // const [players, setPlayers] = useState([]);
    // const [gameID, setGameID] = useState(null);
    // useEffect(() => {
    //     generateUniqueGameID();
    // }, []);
    // View
    const [view, setView] = useState('start');
    // Card animations
    const [jackFlipping, setJackFlipping] = useState(false);
    const [queenFlipping, setQueenFlipping] = useState(false);
    const animateFlip = (isFlipping, setFlipping) => {
        if(isFlipping)
            return;
        setFlipping(true);
        setTimeout(() => {
            setFlipping(false);
        }, 500);
    };
    // Rules
    const [rules, setRules] = useState({
        play: 'score',
        goal: 150,
        stickDealer: 'yes',
        allowMisdeal: 'yes',
        meldSpeed: 'medium'
    });
    const createRulesOptionsElements = (ruleLabel, key, values, buttonLabels) => {
        return (
            <div className='psv-rules-options-container'>
                <div className='psv-rules-label'>{ruleLabel}:</div>
                <div className='psv-rules-options'>
                    {values.map((v, i) => 
                        <button key={key + i} 
                            className={`psv-rules-option-button psv-option-${(i === 0) ? 'left' : (i === values.length - 1) ? 'right' : 'middle'} ${rules[key] === v ? 'psv-rules-selected-option' : ''}`} 
                            style={{ width: (100 / values.length) + '%' }} 
                            onClick={() => setRules({ ...rules, [key]: v })}
                        >
                            {buttonLabels[i]}
                        </button>
                    )}
                </div>
            </div>
        )
    };
    const createNewGame = async () => {
        const { data, error } = await Supabase.rpc('create_pinochle_game', {
            settings: {
                play: rules.play,
                goal: rules.goal,
                score: rules.score,
                stickDealer: rules.stickDealer,
                allowMisdeal: rules.allowMisdeal,
                meldSpeed: rules.meldSpeed
            }
        });
        if(error) {
            console.error(error);
        } else {
            navigate('../play/' + data);
        }
    };
    const joinExistingGame = () => {
        setView('start');
        // TODO: API call to join an existing game
    };

    return (
        <div className='psv-start-page'>

            {/* Header title & logo */}
            <div className='psv-nickster-text'>Nickster</div>
            <div className='psv-subtitle-text'>Pinochle</div>
            <div className='psv-card-jack' onClick={() => animateFlip(jackFlipping, setJackFlipping)}>
                <PlayingCard suit='Diamonds' rank='Jack' additionalClasses={`${jackFlipping ? 'pc-flipped' : ''}`} backFaceImage={cardBackImage}/>
            </div>
            <div className='psv-card-queen' onClick={() => animateFlip(queenFlipping, setQueenFlipping)}>
                <PlayingCard suit='Spades' rank='Queen' additionalClasses={`${queenFlipping ? 'pc-flipped' : ''}`} backFaceImage={cardBackImage}/>
            </div>

            {/* New & Join buttons */}
            <button className={`psv-game-button psv-new-game-button ${view === 'start' ? 'psv-fade-in' : 'psv-fade-out'}`} onClick={() => setView('new')}>
                <FontAwesomeIcon className='icon' icon={faCirclePlus} style={{ marginRight: '2vmin' }} />
                <div className='psv-button-text-container'>
                    <div className='psv-button-text'>New</div>
                    <div className='psv-button-subtext'>Start a new game</div>
                </div>
            </button>
            <button className={`psv-game-button psv-join-game-button ${view === 'start' ? 'psv-fade-in' : 'psv-fade-out'}`} onClick={() => setView('join')}>
                <FontAwesomeIcon className='icon' icon={faRightToBracket} style={{ marginRight: '2vmin' }} />
                <div className='psv-button-text-container'>
                    <div className='psv-button-text'>Join</div>
                    <div className='psv-button-subtext'>Join an existing game</div>
                </div>
            </button>

            {/* New game settings view */}
            <div className={`psv-rules-container ${view === 'new' ? 'psv-fade-in' : 'psv-fade-out'}`}>
                <div className='psv-rules-title'><u>Game Rules</u></div>
                <div className='psv-rules-summary'>{
                    'Play to ' + (rules.play === 'score' ? (rules.score + ' points') : (rules.hands + ' hands')) +
                    (rules.stickDealer === 'yes' ? ', stick the dealer' : '') +
                    (rules.allowMisdeal === 'yes' ? ', allow misdeals' : '') +
                    ', ' + rules.meldSpeed + ' meld speed'
                }</div>
                {createRulesOptionsElements('Play', 'play', ['score', 'hands'], ['To Score', '# of Hands'])}
                {rules.play === 'score' && createRulesOptionsElements('To Score', 'goal', [150, 200, 250], ['150', '200', '250'])}
                {rules.play === 'hands' && createRulesOptionsElements('# of Hands', 'goal', [4, 5, 6], ['4', '5', '6'])}
                {createRulesOptionsElements('Stick the Dealer', 'stickDealer', ['yes', 'no'], ['Yes', 'No'])}
                {createRulesOptionsElements('Allow Misdeal', 'allowMisdeal', ['yes', 'no'], ['Yes', 'No'])}
                {createRulesOptionsElements('Meld Speed', 'meldSpeed', ['slow', 'medium', 'fast'], ['Slow', 'Med', 'Fast'])}
                <div className='psv-rules-button-container'>
                    <button className='psv-rules-button' onClick={() => setView('start')}>
                        <FontAwesomeIcon className='icon' icon={faCircleArrowLeft} style={{ marginRight: '2vmin' }} />
                        <div className='psv-rules-button-text'>Back</div>
                    </button>
                    <button className='psv-rules-button' onClick={createNewGame}>
                        <FontAwesomeIcon className='icon' icon={faCirclePlus} style={{ marginRight: '2vmin' }} />
                        <div className='psv-rules-button-text'>Create</div>
                    </button>
                </div>
            </div>

            {/* Join existing game view */}
            <div className={`psv-join-container ${view === 'join' ? 'psv-fade-in' : 'psv-fade-out'}`}>
                <div className='psv-join-button-container'>
                    <button className='psv-join-button' onClick={() => setView('start')}>
                        <FontAwesomeIcon className='icon' icon={faCircleArrowLeft} style={{ marginRight: '2vmin' }} />
                        <div className='psv-rules-button-text'>Back</div>
                    </button>
                    <button className='psv-join-button' style={{ fontSize: '5.5vmin' }} onClick={joinExistingGame}>
                        <FontAwesomeIcon className='icon' icon={faRightToBracket} style={{ marginRight: '2vmin' }} />
                        <div className='psv-rules-button-text'>Join</div>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PinochleStartView;