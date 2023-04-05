import React, { useState, useEffect, useRef, Children, createElement } from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import './pinochle-title.css';
import qos_svg from '../images/cards/queen_of_spades2.svg';
import jod_svg from '../images/cards/jack_of_diamonds2.svg';
import {createCard} from '../util/CardUtils';
import { unmountComponentAtNode } from 'react-dom';
import Card from '../Card';

export default function PinochleTitleScreen() {
    const cardContainerRef = useRef(null);
    const titleTextRef = useRef(null);
    const randomCardRef = useRef(null);
    useEffect(() => {
        // alert(titleTextRef.current.offsetWidth);
    });
    return (
        <div className="title-page">
            {createTitleText(titleTextRef)}
            {createTitleCards(cardContainerRef)}
            {createTitleLoading()}
            {/* {createTitleButton(cardContainerRef, randomCardRef)} */}
            <div style={{ top: 0, left: 0 }}><motion.div style={{ top: 0, left: 0 }}><Card suit="hearts" rank="K" /></motion.div></div>
            <div style={{ top: 0, right: 0 }}><motion.div style={{ top: 0, right: 0 }}><Card suit="spades" rank="K" /></motion.div></div>
            <div style={{ bottom: 0, left: 0 }}><motion.div style={{ bottom: 0, left: 0 }}><Card suit="clubs" rank="K" /></motion.div></div>
            <div style={{ bottom: 0, right: 0 }}><motion.div style={{ bottom: 0, right: 0 }}><Card suit="diamonds" rank="K" /></motion.div></div>
            {createTitleButton(cardContainerRef, randomCardRef)}
            {/* <button style={{height: "30px", width: "100px", fontSize: "16px"}} onClick={start}>Play!</button> */}
        </div>
    );
}

function createTitleText(titleTextRef) {
    return (
        <motion.div ref={titleTextRef} className="title-text"
            initial={{ top: "20%", left: "50%", translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: [1, 1.1, 1.1, 1, 1], rotate: [0, -3, 3, -3, 3, 0] }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        >
            Nickster Cards™
        </motion.div>
    );
}

function createTitleCards(cardContainerRef) {
    return (
        <div ref={cardContainerRef} className="title-cards" id="card-container" 
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

function createTitleButton(cardContainerRef, randomCardRef) {
    function handleClick() {
        const container = cardContainerRef.current;
        const containerEl = document.getElementById("card-container");
        if(containerEl.childElementCount > 2) {
            unmountComponentAtNode(containerEl.getElementById("random-card"));
        }
        // containerEl.appendChild(createElement("div", { id: "random-card" }, "Testing!"));
        // render(<div id="random-card">Testing!</div>, containerEl);
    }
    return (
        <div style={{ top: "70%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>
            <button style={{ height: '40px', width: '100px', fontSize: '20px' }} onClick={handleClick}>
                <div style={{display:"inline-flex"}}>
                    <div style={{color:"red"}}>♥</div>&nbsp;♠&nbsp;<div style={{color:"red"}}>♦</div>&nbsp;♣
                </div>
            </button>
        </div>
    );
}