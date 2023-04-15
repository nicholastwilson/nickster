import React, { useState, useEffect, useRef, Children, createElement } from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import './pinochle-title.css';
import qos_svg from '../images/playing_cards/queen_of_spades2.svg';
import jod_svg from '../images/playing_cards/jack_of_diamonds2.svg';
import { unmountComponentAtNode } from 'react-dom';
import PlayingCard, {Suits, Ranks} from '../PlayingCard';
import PinochleGame, {createDeck} from './PinochleGame';

var si = 0;
var ri = -1;

export default function PinochleTitleScreen() {
    const [cards, setCards] = useState([]);
    const deck = createDeck();
    const addCard = () => {
        ri++;
        if(ri === Ranks.length) {
            ri = 0;
            si++;
            if(si === Suits.length)
                si = 0;
        }
        let suit = Suits[si];
        let rank = Ranks[ri];
        // let suit = Suits[Math.floor(Math.random() * Suits.length)];
        // let rank = Ranks[Math.floor(Math.random() * Ranks.length)];
        let top = Math.random() * 65;
        let left = Math.random() * 25 + (Math.random() < 0.5 ? 65 : 0);
        let newCard = (
            <div style={{ top: top + "%", left: left + "%" }}>
                <motion.div
                    // animate={{ rotate: [0, 360] }}
                    // transition={{ duration: 10, repeat: Infinity }}
                >
                    {deck[Math.floor(Math.random() * deck.length)]}
                    {/* <PlayingCard suit={suit} rank={rank} /> */}
                </motion.div>
            </div>
        );
        setCards([...cards.slice(cards.length == 20 ? 1 : 0), newCard]);
    };
    const keydown = (e) => {
        addCard();
    };
    return (
        <div className="title-page" tabindex="0" onKeyDown={keydown}>
            {createTitleText()}
            {createTitleCards()}
            {createTitleLoading()}
            {cards}
            {createAddCardButton(addCard)}
        </div>
    );
}

function createTitleText() {
    return (
        <motion.div className="title-text"
            initial={{ top: "20%", left: "50%", translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: [1, 1.1, 1.1, 1, 1], rotate: [0, -3, 3, -3, 3, 0] }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        >
            Nickster Cards™
        </motion.div>
    );
}

function createTitleCards() {
    return (
        <div className="title-cards" id="card-container" 
            style={{ top: "50%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}
        >
            <motion.img className="title-card-left" src={qos_svg} alt="Queen of Spades" 
                initial={{ scale: 1.2, boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.75)" }}
                animate={{  x: [0, -150, 0], rotate: [-22.5, -360, -22.5], transition: { delay: 2, duration: 3, times: [0, 0.75, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 2 } }} 
                whileTap={{ scale: 1.5, boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)" }}
            />
            <motion.img className="title-card-right" src={jod_svg} alt="Jack of Diamonds" 
                initial={{ scale: 1.2, boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.75)" }}
                animate={{ x: [0, 150, 0], rotate: [22.5, 360, 22.5], transition: { delay: 2, duration: 3, times: [0, 0.75, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 2 } }} 
                whileTap={{ scale: 1.5, boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)" }}
            />
        </div>
    );
}

function createTitleLoading() {
    return (
        <div style={{ top: "80%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
            <div className="title-loading">{ ("Loading...").split('').map(function (a) { return <span>{a}</span> }) }</div>
        </div>
    );
}

var interval = 0;

function createAddCardButton(addCard) {
    return (
        <div style={{ top: "70%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
            <button style={{ height: '40px', width: '100px', fontSize: '20px' }} onClick={addCard}>
                <div style={{display:"inline-block"}}>Add Card</div>
            </button>
        </div>
    );
}