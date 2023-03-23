// import { useState } from 'react';
import { motion } from 'framer-motion';
import './pinochle-title.css';
import qos_svg from '../images/cards/queen_of_spades2.svg';
import jod_svg from '../images/cards/jack_of_diamonds2.svg';

export default function PinochleTitleScreen() {
    return (
        <div class="title-page">
            <div><motion.div 
                className="title-text"
                animate={{ 
                    scale: [1, 1.1, 1.1, 1, 1], 
                    rotate: [0, -3, 3, -3, 3, 0] 
                }}
                transition={{ 
                    duration: 1, 
                    ease: "easeInOut", 
                    repeat: Infinity, 
                    repeatDelay: 3 
                }}
            >
                Nickster Cards™
            </motion.div></div>
            <div className="title-cards">
                <motion.img className="title-card-left" src={qos_svg} alt="Queen of Spades" 
                    initial={{
                        boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.75)"
                    }}
                    animate={{ 
                        x: [0, -50, 0], 
                        rotate: [-22.5, -360, -22.5], 
                        transition: { 
                            delay: 2, 
                            duration: 3, 
                            times: [0, 0.75, 1], 
                            ease: "easeInOut", 
                            repeat: Infinity, 
                            repeatDelay: 2 
                        }
                    }} 
                    whileTap={{ 
                        scale: 1.2, 
                        boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)" 
                    }}
                />
                <motion.img className="title-card-right" src={jod_svg} alt="Jack of Diamonds" 
                    initial={{
                        boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.75)"
                    }}
                    animate={{ 
                        x: [0, 50, 0], 
                        rotate: [22.5, 360, 22.5], 
                        transition: { 
                            delay: 2, 
                            duration: 3, 
                            times: [0, 0.75, 1], 
                            ease: "easeInOut", 
                            repeat: Infinity, 
                            repeatDelay: 2 
                        }
                    }} 
                    whileTap={{ 
                        scale: 1.2, 
                        boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.25)"
                    }}
                />
            </div>
            <div><div className="title-loading">{ ("Loading...").split('').map(function (a) { return <span>{a}</span> }) }</div></div>
            {/* <p/><p/>
            <button style={{height: "30px", width: "100px", fontSize: "16px"}} onClick={this.start}>Play!</button> */}
        </div>
    );
}