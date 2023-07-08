import svgClubs from './images/suit-clubs.svg';
import svgDiamonds from './images/suit-diamonds.svg';
import svgHearts from './images/suit-hearts.svg';
import svgSpades from './images/suit-spades.svg';
import './PlayingCard.scss';

const Suits = {
    Clubs: { symbol: "♣", svg: svgClubs },
    Diamonds: { symbol: "♦", svg: svgDiamonds },
    Hearts: { symbol: "♥", svg: svgHearts },
    Spades: { symbol: "♠", svg: svgSpades }
}

const Ranks = {
    Ace: { symbol: "A", pips: 1 },
    Two: { symbol: "2", pips: 2 },
    Three: { symbol: "3", pips: 3 },
    Four: { symbol: "4", pips: 4 },
    Five: { symbol: "5", pips: 5 },
    Six: { symbol: "6", pips: 6 },
    Seven: { symbol: "7", pips: 7 },
    Eight: { symbol: "8", pips: 8 },
    Nine: { symbol: "9", pips: 9 },
    Ten: { symbol: "10", pips: 10 },
    Jack: { symbol: "J", pips: 0 },
    Queen: { symbol: "Q", pips: 0 },
    King: { symbol: "K", pips: 0 }
}

function PlayingCard({ suit, rank, additionalClasses = "" }) {
    const s = Suits[suit];
    const r = Ranks[rank];
    const pipElements = [];
    for (var i = 0; i < r.pips; i++) {
        pipElements.push(
            <img className={"center-pip-" + (i + 1) + " suit-" + suit + " rank-" + rank} svgImage src={s.svg} alt={suit} loading='eager' />
        );
    }
    return (
        <div className={`card ${additionalClasses}`}>
            <div className="card-content">
                <div className="corners">
                    <div className="corner-1">
                        <div className={"corner-1-rank suit-" + suit + " rank-" + rank}>{r.symbol}</div>
                        <img className={"corner-1-suit suit-" + suit + " rank-" + rank} src={s.svg} alt={suit} loading='eager' />
                    </div>
                    <div className="corner-2">
                        <div className={"corner-2-rank suit-" + suit + " rank-" + rank}>{r.symbol}</div>
                        <img className={"corner-2-suit suit-" + suit + " rank-" + rank} src={s.svg} alt={suit} loading='eager' />
                    </div>
                </div>
                <div className={"center suit-" + suit + " rank-" + rank}>{pipElements}</div>
            </div>
        </div>
    );
}

export { PlayingCard as default, Suits, Ranks };