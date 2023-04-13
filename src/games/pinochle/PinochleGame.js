import PinochleTitleScreen from './PinochleTitleScreen';
import PlayingCard, {Suits, Ranks, createCard} from '../PlayingCard';

export default function PinochleGame() {
    return (
        <div>
            <PinochleTitleScreen />
        </div>
    );
}

export function createDeck() {
    const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    const ranks = ["9", "Jack", "Queen", "King", "10", "Ace"];
    const deck = [];
    for(var s = 0; s < suits.length; s++) {
        for(var r = 0; r < ranks.length; r++) {
            deck.push(<PlayingCard suit={suits[s]} rank={ranks[r]} />);
        }
    }
    return deck;
}

// export const Suits = ['hearts', 'spades', 'diamonds', 'clubs'];
// export const Ranks = ['9', 'J', 'Q', 'K', '10', 'A'];