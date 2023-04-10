import React from "react";
import cardCSS from './card.css';

function Card({suit, rank}) {
    const suitSymbol = (suit == "hearts") ? "♥" : (suit == "spades") ? "♠" : (suit == "diamonds") ? "♦" : (suit == "clubs") ? "♣" : "?";
    return (
        <div className={"card suit-" + suit}>
            <div className="card-content">
                <div className="corners">
                    <div className={"top-left-container"}>
                        <div className={"suit-" + suit + " top-left-rank"}>{rank}</div>
                        <div className={"suit-" + suit + " top-left-suit"}>{suitSymbol}</div>
                    </div>
                    <div className={"bottom-right-container"}>
                        <div className={"suit-" + suit + " bottom-right-rank"}>{rank}</div>
                        <div className={"suit-" + suit + " bottom-right-suit"}>{suitSymbol}</div>
                    </div>
                </div>
                <div className={"center-" + suit}>
                    <div className={"suit-" + suit + " center-pattern-" + rank}>{suitSymbol}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;