import React, { useState } from 'react';
import _ from 'lodash';
import { motion } from 'framer-motion';
import './pinochle-title.css';
import PlayingCard, {Suits, Ranks} from '../PlayingCard';
import PinochleGame, {createDeck} from './PinochleGame';

export default function PinochleTitleScreen() {
    const [cards, setCards] = useState([]);

    function handleAddCard() {
        let newCard = (
            <div style={{ top: _.random(5, 55) + "%", left: (_.random(0, 1) ? 2 : 75) + "%" }}>
                <PlayingCard 
                    suit={_.sample(Object.keys(Suits))} 
                    rank={_.sample(["Nine", "Ten", "Jack", "Queen", "King", "Ace"])} 
                    trumpClass={_.random(0, 3) ? "not-trump" : "trump"}
                />
            </div>
        );
        setCards([...cards.slice(cards.length === 10 ? 1 : 0), newCard]);
    }

    return (
        <div className="title-page" tabindex="0" onKeyDown={handleAddCard}>
            {/* Title text */}
            <motion.div className="title-text"
                initial={{ top: "20%", left: "50%", translateX: "-50%", translateY: "-50%" }}
                animate={{ scale: [1, 1.1, 1.1, 1, 1], rotate: [0, -3, 3, -3, 3, 0] }}
                transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
            >
                Nickster Cards™
            </motion.div>
            {/* {createTitleCards()} */}
            {/* Loading... */}
            <div style={{ top: "80%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
                <div className="title-loading">{ ("Loading...").split('').map(function (a) { return <span>{a}</span> }) }</div>
            </div>
            {/* Cards */}
            {cards}
            {/* Add card button */}
            <div style={{ top: "70%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
                <button style={{ height: "40px", width: "160px", fontSize: "20px" }} onClick={handleAddCard}>
                    <div style={{display: "flex", "font-size": "20px"}}>
                        <div style={{color:"#D40000"}}>♥</div> ♠ Add Card<div style={{color:"#D40000"}}>♦</div> ♣
                    </div>
                </button>
            </div>
        </div>
    );

}

// function createTitleCards() {
//     return (
//         <div className="title-cards" id="card-container" 
//             style={{ top: "50%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}
//         >
//             <motion.img className="title-card-left" src={qos_svg} alt="Queen of Spades" 
//                 initial={{ scale: 1.2, boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.75)" }}
//                 animate={{  x: [0, -150, 0], rotate: [-22.5, -360, -22.5], transition: { delay: 2, duration: 3, times: [0, 0.75, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 2 } }} 
//                 whileTap={{ scale: 1.5, boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)" }}
//             />
//             <motion.img className="title-card-right" src={jod_svg} alt="Jack of Diamonds" 
//                 initial={{ scale: 1.2, boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.75)" }}
//                 animate={{ x: [0, 150, 0], rotate: [22.5, 360, 22.5], transition: { delay: 2, duration: 3, times: [0, 0.75, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 2 } }} 
//                 whileTap={{ scale: 1.5, boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)" }}
//             />
//         </div>
//     );
// }