import PinochleTitleScreen from './PinochlePage';
import PlayingCard, {Suits, Ranks, createCard} from '../../../components/cards/PlayingCard';
import Supabase from 'utils/Supabase';
import PlayingCard, {Suits, Ranks} from '../PlayingCard';

export default function PinochleGameView({ gameID }) {
    return (
        <GameContext.Provider value={gameState}>
            <div className="title-page" tabIndex="0" onKeyDown={handleAddCard}>
                {/* Title text */}
                <motion.div className="title-text"
                    initial={{ top: "0", left: "50%", translateX: "-50%", translateY: "0" }}
                    animate={{ scale: [1, 1.1, 1.1, 1, 1], rotate: [0, -3, 3, -3, 3, 0] }}
                    transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                >
                    Nickster Cards™
                </motion.div>
                {/* Cards */}
                <div className="cards-container">
                    {cards}
                </div>
                {/* Add card button */}
                <motion.button className="add-card-button" 
                    whileTap={{ translate: "0% 5%"}}
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
                    <option value="not-trump">Not Trump</option>
                    <option value="trump">Trump</option>
                </select> */}
                {/* Loading... */}
                {/* <div style={{ top: "85%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
                    <div className="title-loading">{ ("Loading...").split("").map(function (a) { return <span>{a}</span> }) }</div>
                </div> */}
            </div>
        </GameContext.Provider>
    );
}

export function createDeck(trumpSuit) {
    alert("[PinochleGame.createDeck] trumpSuit=" + trumpSuit);
    const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    const ranks = ["Nine", "Jack", "Queen", "King", "Ten", "Ace"];
    const deck = [];
    for(var s = 0; s < suits.length; s++) {
        for(var r = 0; r < ranks.length; r++) {
            deck.push(<PlayingCard suit={suits[s]} rank={ranks[r]} trumpSuit={trumpSuit} />);
        }
    }
    return deck;
}