import React from "react";
import cardCSS from './card.css';

const suitSymbolMap = {
    hearts: "♥",
    spades: "♠",
    diamonds: "♦",
    clubs: "♣"
}

function Card({suit, rank}) {
    const suitSymbol = suitSymbolMap[suit];
    return (
        <div className={"card suit-" + suit}>
            <div className="card-content">
                <div className="card-corners">
                    <div className={"suit-" + suit + " top-left-rank"}>{rank}</div>
                    <div className={"suit-" + suit + " top-left-suit"}>{suitSymbol}</div>
                    <div className={"suit-" + suit + " top-right-rank"}>{rank}</div>
                    <div className={"suit-" + suit + " top-right-suit"}>{suitSymbol}</div>
                    <div className={"suit-" + suit + " bottom-left-rank"}>{rank}</div>
                    <div className={"suit-" + suit + " bottom-left-suit"}>{suitSymbol}</div>
                    <div className={"suit-" + suit + " bottom-right-rank"}>{rank}</div>
                    <div className={"suit-" + suit + " bottom-right-suit"}>{suitSymbol}</div>
                    <div className={"center-" + suit}>
                        <div className={"suit-" + suit + " center-pattern"}>{suitSymbol}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;