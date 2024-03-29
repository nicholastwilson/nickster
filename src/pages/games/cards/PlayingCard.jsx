import svgClubs from "assets/images/games/cards/suit-clubs.svg";
import svgDiamonds from "assets/images/games/cards/suit-diamonds.svg";
import svgHearts from "assets/images/games/cards/suit-hearts.svg";
import svgSpades from "assets/images/games/cards/suit-spades.svg";

import "./PlayingCard.scss";

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

function PlayingCard({ suit, rank, trump = false, trumpColor = "gold", additionalClasses = "", backFaceImage = "" }) {
    const s = Suits[suit];
    const r = Ranks[rank];
    const pipElements = [];
    for (var i = 0; i < r.pips; i++) {
        pipElements.push(
            <img key={i} className={"pc-center-pip-" + (i + 1) + " pc-suit-" + suit + " pc-rank-" + rank} src={s.svg} alt={suit} loading="eager" />
        );
    }
    return (
        <div className={`pc-card ${additionalClasses}`}>
            <div className="pc-card-inner">
                <div className={`pc-front-face ${trump ? "pc-trump-" + trumpColor : ""}`}>
                    <div className="pc-corners">
                        <div className="pc-corner-1">
                            <div className={"pc-corner-1-rank pc-suit-" + suit + " pc-rank-" + rank}>{r.symbol}</div>
                            <img className={"pc-corner-1-suit pc-suit-" + suit + " pc-rank-" + rank} src={s.svg} alt={suit} loading="eager" />
                        </div>
                        <div className="pc-corner-2">
                            <div className={"pc-corner-2-rank pc-suit-" + suit + " pc-rank-" + rank}>{r.symbol}</div>
                            <img className={"pc-corner-2-suit pc-suit-" + suit + " pc-rank-" + rank} src={s.svg} alt={suit} loading="eager" />
                        </div>
                    </div>
                    <div className={"pc-center pc-suit-" + suit + " pc-rank-" + rank}>{pipElements}</div>
                </div>
                <div className="pc-back-face">
                    <img className="" src={backFaceImage} alt="" loading="eager" />
                </div>
            </div>
        </div>
    );
}

export { PlayingCard as default, Suits, Ranks };