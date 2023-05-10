import PinochleTitleScreen from './PinochleTitleScreen';
import PlayingCard, {Suits, Ranks, createCard} from '../PlayingCard';

export default function PinochleGame() {
    return (
        <div>
            <PinochleTitleScreen />
        </div>
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