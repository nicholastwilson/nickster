import React, { useState } from "react";
import _ from "lodash";
import { motion } from "framer-motion";
import Select from "react-select";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./pinochle-title.scss";
import PlayingCard, {Suits, Ranks} from "../PlayingCard";
import PinochleGame, {createDeck} from "./PinochleGame";

var cardIdx = 0;

export default function PinochleTitleScreen() {
    const [cards, setCards] = useState([]);
    const [trump, setTrump] = useState(null);
    function handleAddCard() {
        let newCard = (
            <PlayingCard 
                suit={_.sample(Object.keys(Suits))} 
                rank={_.sample(["Nine", "Jack", "Queen", "King", "Ten", "Ace"])} 
                trumpClass={_.random(0, 3) ? "not-trump" : "trump"}
            />
        );
        let temp = cards.slice(0);
        temp[cardIdx++] = newCard;
        if(cardIdx == 12)
            cardIdx = 0;
        setCards(temp);
        // setCards([...cards.slice(cards.length === 12 ? 1 : 0), newCard]);
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
            {/* Cards */}
            <div className="cards-container">
                {cards}
            </div>
            {/* Add card button */}
            <div style={{ top: "70%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
                <motion.button whileTap={{ scale: 0.9 }} style={{ height: "40px", width: "160px", fontSize: "20px", "box-shadow": "-1px 3px 5px rgba(0, 0, 0, 0.3)" }} onClick={handleAddCard}>
                    <div style={{display: "flex", "font-size": "20px"}}>
                        <div style={{color:"#D40000"}}>♥</div>  ♠  Add Card  <div style={{color:"#D40000"}}>♦</div>  ♣
                    </div>
                </motion.button>
            </div>
            {/* Select trump suit drop-down */}
            <div style={{ position: "absolute", width: "200px", height: "40px", top: "77%", left: "50%", transform: "translateX(-50%) translateY(-50%)", "box-shadow": "-1px 3px 5px rgba(0, 0, 0, 0.3)" }}>
                <Dropdown style={{ "box-shadow": "-1px 3px 5px rgba(0, 0, 0, 1.0)" }}
                    options={["Clubs", "Diamonds", "Hearts", "Spades"]}
                    onChange={setTrump}
                    placeholder="Select an option"
                />
                {/* <Select
                    defaultValue={trump}
                    onChange={setTrump}
                    options={[
                        { value: "Clubs", label: "Clubs" },
                        { value: "Diamonds", label: "Diamonds" },
                        { value: "Hearts", label: "Hearts" },
                        { value: "Spades", label: "Spades" }
                    ]}
                    placeholder="Select trump..."
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            // text: 'black',
                            // font:'#3599B8',
                            // primary25: '#3599B8',
                            // primary: 'black',
                            // neutral80: 'black',
                            // color: 'black',
                        },
                    })}
                /> */}
            </div>
            {/* Loading... */}
            {/* <div style={{ top: "85%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
                <div className="title-loading">{ ("Loading...").split("").map(function (a) { return <span>{a}</span> }) }</div>
            </div> */}
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