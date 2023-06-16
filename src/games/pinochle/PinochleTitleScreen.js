import React, { useState, useEffect, createContext, useContext } from "react";
import _ from "lodash";
import { motion } from "framer-motion";
import supabase from '../../supabase';
import "./pinochle-title.scss";
import PlayingCard, {Suits, Ranks} from "../PlayingCard";
import PinochleGame, {createDeck} from "./PinochleGame";
import { ThemeContext } from "styled-components";

export default function PinochleTitleScreen() {
    const [gameState, setGameState] = useState({ trump: null });
    // const [players, setPlayers] = useState([]);
    const [cards, setCards] = useState([]);
    const GameContext = createContext();
    function handleAddCard() {
        let newCard = (
            <PlayingCard 
                suit={_.sample(Object.keys(Suits))} 
                rank={_.sample(["Nine", "Jack", "Queen", "King", "Ten", "Ace"])} 
                trumpClass={_.random(0, 4) ? "not-trump" : "trump"}
            />
        );
        if(cards.length < 12) {
            setCards([...cards.slice(0), newCard]);
        } else {
            setCards([newCard]);
        }
    }
    // useEffect(() => {
    //     (async () => {
    //         const { data, error } = await supabase
    //             .from('test')
    //             .select('*');
    //         if (error) {
    //             console.error('Error fetching data:', error.message);
    //         } else {
    //             setPlayers(data);
    //         }
    //     })();
    // }, []);

    return (
        <GameContext.Provider value={gameState}>
            <div className="title-page" tabIndex="0" onKeyDown={handleAddCard}>
                {/* Title text */}
                <motion.div className="title-text"
                    // initial={{ top: "0", left: "50%", translateX: "-50%", translateY: "0" }}
                    animate={{ scale: [1, 1.1, 1.1, 1, 1], rotate: [0, -3, 3, -3, 3, 0] }}
                    transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                >
                    Nickster Cards™
                </motion.div>
                {/* Cards */}
                <div className="cards-container">
                    {cards}
                </div>
                {/* Add card button */}
                <motion.button className="add-card-button" 
                    whileTap={{ translate: "0% 5%"}}
                    transition={{ duration: 0.05 }}
                    onClick={handleAddCard}>
                    Add Card
                </motion.button>
                {/* <div>
                    {players.map((p) => {
                        return (
                            <div key={p.id}>{p.name} ({p.age})</div>
                        );
                    })}
                </div> */}
                {/* Select trump suit drop-down */}
                {/* <select>
                    <option value="not-trump">Not Trump</option>
                    <option value="trump">Trump</option>
                </select> */}
                {/* Loading... */}
                {/* <div style={{ top: "85%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
                    <div className="title-loading">{ ("Loading...").split("").map(function (a) { return <span>{a}</span> }) }</div>
                </div> */}
            </div>
        </GameContext.Provider>
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