import React from "react";
import cardCSS from './playing-card.css';
import svgClubs from './images/playing_cards/suit-clubs.svg';
import svgDiamonds from './images/playing_cards/suit-diamonds.svg';
import svgHearts from './images/playing_cards/suit-hearts.svg';
import svgSpades from './images/playing_cards/suit-spades.svg';

export const Suits = {
    Clubs: { symbol: "♣", svg: svgClubs },
    Diamonds: { symbol: "♦", svg: svgDiamonds },
    Hearts: { symbol: "♥", svg: svgHearts },
    Spades: { symbol: "♠", svg: svgSpades }
}

export const Ranks = {
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
    Jack: { symbol: "J", pips: 2 },
    Queen: { symbol: "Q", pips: 2 },
    King: { symbol: "K", pips: 2 }
}

export default function PlayingCard({suit, rank, trumpClass}) {
    const suitSVG = Suits[suit].svg;
    const rankSymbol = Ranks[rank].symbol;
    const pips = [];
    for(var i = 0; i < Ranks[rank].pips; i++) {
        // if(rank != "Ace" && rank != "King" && rank != "Queen" && rank != "Jack")
        //     break;
        pips.push(
            <img className={"center-pip-" + (i + 1) + " suit-" + suit + " rank-" + rank} src={suitSVG} alt={suit} />
        );
    }
    return (
        <div className={"card " + trumpClass}>
            <div className="card-content">
                <div className="corners">
                    <div className="corner-1">
                        <div className={"corner-1-rank suit-" + suit + " rank-" + rank}>
                            {rankSymbol}
                        </div>
                        <img className={"corner-1-suit suit-" + suit + " rank-" + rank} src={suitSVG} alt={suit}>
                            {/* {suitSymbol} */}
                        </img>
                    </div>
                    <div className="corner-2">
                        <div className={"corner-2-rank suit-" + suit + " rank-" + rank}>
                            {rankSymbol}
                        </div>
                        <img className={"corner-2-suit suit-" + suit + " rank-" + rank} src={suitSVG} alt={suit}>
                            {/* {suitSymbol} */}
                        </img>
                    </div>
                </div>
                <div className={"center suit-" + suit + " rank-" + rank}>
                    {pips}
                </div>
            </div>
        </div>
    );
}