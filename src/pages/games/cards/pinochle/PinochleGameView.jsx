import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { motion} from 'framer-motion';
import PlayingCard, {Suits} from '../PlayingCard';
import './PinochleGameView.scss';

function PinochleGameView() {
    const { gameID } = useParams();
    const [ gameState] = React.useState({
        gameID: gameID
    });
    const PinochleContext = React.createContext();

    // const [players, setPlayers] = useState([]);
    const [cards, setCards] = useState([]);
    function handleAddCard() {
        let newCard = (
            <PlayingCard 
                suit={_.sample(Object.keys(Suits))} 
                rank={_.sample(['Nine', 'Jack', 'Queen', 'King', 'Ten', 'Ace'])} 
                trumpClass={_.random(0, 4) ? '' : 'trump'}
            />
        );
        if(cards.length < 12) {
            setCards([...cards.slice(0), newCard]);
        } else {
            setCards([newCard]);
        }
    }
    // useEffect(() => {
    //     (async () => {
    //         const { data, error } = await supabase
    //             .from('test')
    //             .select('*');
    //         if (error) {
    //             console.error('Error fetching data:', error.message);
    //         } else {
    //             setPlayers(data);
    //         }
    //     })();
    // }, []);

    return (
        <PinochleContext.Provider value={gameState}>
            <div>Game ID: {gameID}</div>
            <div className='title-page' tabIndex='0' onKeyDown={handleAddCard}>
                {/* Title text */}
                <motion.div className='title-text'
                    initial={{ top: '0', left: '50%', translateX: '-50%', translateY: '0' }}
                    animate={{ scale: [1, 1.1, 1.1, 1, 1], rotate: [0, -3, 3, -3, 3, 0] }}
                    transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
                >
                    Nickster Cards™
                </motion.div>
                {/* Cards */}
                <div className='cards-container'>
                    {cards}
                </div>
                {/* Add card button */}
                <motion.button className='add-card-button' 
                    whileTap={{ translate: '0% 5%'}}
                    transition={{ duration: 0.05 }}
                    onClick={handleAddCard}>
                    Add Card
                </motion.button>
                {/* <div>
                    {players.map((p) => {
                        return (
                            <div key={p.id}>{p.name} ({p.age})</div>
                        );
                    })}
                </div> */}
                {/* Select trump suit drop-down */}
                {/* <select>
                    <option value='not-trump'>Not Trump</option>
                    <option value='trump'>Trump</option>
                </select> */}
            </div>
        </PinochleContext.Provider>
    );
}

// function createPinochleDeck(trumpSuit) {
//     alert('[PinochleGame.createDeck] trumpSuit=' + trumpSuit);
//     const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
//     const ranks = ['Nine', 'Jack', 'Queen', 'King', 'Ten', 'Ace'];
//     const deck = [];
//     for(var s = 0; s < suits.length; s++) {
//         for(var r = 0; r < ranks.length; r++) {
//             deck.push(<PlayingCard suit={suits[s]} rank={ranks[r]} trumpSuit={trumpSuit} />);
//         }
//     }
//     return deck;
// }

export default PinochleGameView;