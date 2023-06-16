import React from "react";
import { motion } from 'framer-motion';
import './playing-card.scss';
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
    Jack: { symbol: "J", pips: 0 },
    Queen: { symbol: "Q", pips: 0 },
    King: { symbol: "K", pips: 0 }
}

export default function PlayingCard({suit, rank, trumpClass}) {
    const s = Suits[suit];
    const r = Ranks[rank];
    const pipElements = [];
    for(var i = 0; i < r.pips; i++) {
        pipElements.push(
            <img className={"center-pip-" + (i + 1) + " suit-" + suit + " rank-" + rank} svgImage src={s.svg} alt={suit} />
        );
    }
    return (
        <motion.div
            whileTap={{ scale: 1.1 }}
            drag
            whileDrag={{ scale: 1.1 }}
            // dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragSnapToOrigin="true"
            dragElastic={0.5}
            // transition={{ duration: 0.1, ease: "easeInOut" }}
            >
            <div className={"card " + trumpClass}>
                <div className="card-content">
                    <div className="corners">
                        <div className="corner-1">
                            <div className={"corner-1-rank suit-" + suit + " rank-" + rank}>
                                {r.symbol}
                            </div>
                            <img className={"corner-1-suit suit-" + suit + " rank-" + rank} src={s.svg} alt={suit}>
                                {/* {s.symbol} */}
                            </img>
                        </div>
                        <div className="corner-2">
                            <div className={"corner-2-rank suit-" + suit + " rank-" + rank}>
                                {r.symbol}
                            </div>
                            <img className={"corner-2-suit suit-" + suit + " rank-" + rank} src={s.svg} alt={suit}>
                                {/* {s.symbol} */}
                            </img>
                        </div>
                    </div>
                    <div className={"center suit-" + suit + " rank-" + rank}>
                        {pipElements}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}