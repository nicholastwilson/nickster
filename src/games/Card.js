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
            <div className={"suit-" + suit + " top-left"}>{rank}<br/>{suitSymbol}</div>
            <div className={"suit-" + suit + " top-right"}>{rank}<br/>{suitSymbol}</div>
            <div className={"suit-" + suit + " bottom-left"}>{suitSymbol}<br/>{rank}</div>
            <div className={"suit-" + suit + " bottom-right"}>{suitSymbol}<br/>{rank}</div>
            <div className={"center-" + suit}>
                <div className={"suit-" + suit + " center-pattern"}>{suitSymbol}</div>
            </div>
        </div>
    );
}

export default Card;