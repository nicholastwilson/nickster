import PinochleTitleScreen from './PinochleTitleScreen';

export default function PinochleGame() {
    return (
        <div>
            <PinochleTitleScreen />
        </div>
    );
}

export const Suits = ['hearts', 'spades', 'diamonds', 'clubs'];
export const Ranks = ['9', 'J', 'Q', 'K', '10', 'A'];