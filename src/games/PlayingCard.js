import React from "react";
import cardCSS from './playing-card.css';

export const Suits = {
    Clubs: { symbol: "♣" },
    Diamonds: { symbol: "♦" },
    Hearts: { symbol: "♥" },
    Spades: { symbol: "♠" }
}

export const Ranks = {
    Ace: { symbol: "A", pips: { count: 1 } },
    Two: { symbol: "2", pips: { count: 2 } },
    Three: { symbol: "3", pips: { count: 3 } },
    Four: { symbol: "4", pips: { count: 4 } },
    Five: { symbol: "5", pips: { count: 5 } },
    Six: { symbol: "6", pips: { count: 6 } },
    Seven: { symbol: "7", pips: { count: 7 } },
    Eight: { symbol: "8", pips: { count: 8 } },
    Nine: { symbol: "9", pips: { count: 9 } },
    Ten: { symbol: "10", pips: { count: 10 } },
    Jack: { symbol: "J", pips: { count: 2 } },
    Queen: { symbol: "Q", pips: { count: 2 } },
    King: { symbol: "K", pips: { count: 2 } }
}

export default function PlayingCard({suit, rank}) {
    const suitSymbol = Suits[suit].symbol;
    const rankSymbol = Ranks[rank].symbol;
    const pipCount = Ranks[rank].pips.count;
    const pips = [];
    for(var i = 0; i < pipCount; i++)
        pips.push(<div className={"center-pip-" + (i + 1) + " suit-" + suit + " rank-" + rank}>{suitSymbol}</div>);
    return (
        <div className="card">
            <div className="card-content">
                <div className="corners">
                    <div className="corner-1">
                        <div className={"corner-1-rank suit-" + suit + " rank-" + rank}>{rankSymbol}</div>
                        <div className={"corner-1-suit suit-" + suit + " rank-" + rank}>{suitSymbol}</div>
                    </div>
                    <div className="corner-2">
                        <div className={"corner-2-rank suit-" + suit + " rank-" + rank}>{rankSymbol}</div>
                        <div className={"corner-2-suit suit-" + suit + " rank-" + rank}>{suitSymbol}</div>
                    </div>
                </div>
                <div className={"center suit-" + suit + " rank-" + rank}>{pips}</div>
            </div>
        </div>
    );
}