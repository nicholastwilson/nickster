import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion} from "framer-motion";
import _ from "lodash";
import { toast } from "react-hot-toast";

import Supabase from "features/storage/Supabase";
import { useSelector } from "react-redux";
import PlayingCard, {Suits} from "../PlayingCard";
import cardBackImage from "assets/images/games/cards/card-back.png";

import "./PinochleGameView.scss";

function PinochleGameView() {
    const { gameID } = useParams();
    const profile = useSelector(state => state.profile);
    const [cards, setCards] = useState(null);
    const [trumpSuit, setTrumpSuit] = useState(null);

    // Retrieve game state
    useEffect(() => {
        Supabase.rpc("get_game_state", { profile_id: profile.id, game_id: gameID }).then(res => {
            console.log("Response: " + JSON.stringify(res));
            if(res.status !== 200) {
                toast.error('Error communicating with Nickster server');
                return;
            }
            const data = res.data;
            if(!data.success) {
                toast.error(data.message);
                return;
            }
            const suitOrder = ["H", "S", "D", "C"];
            const rankOrder = ["A", "T", "K", "Q", "J", "9"];
            data.hand = data.hand.sort((a, b) => {
                const aSuit = a.substring(1, 2);
                const bSuit = b.substring(1, 2);
                if(aSuit !== bSuit) {
                    return suitOrder.indexOf(aSuit) - suitOrder.indexOf(bSuit);
                } else {
                    return rankOrder.indexOf(a.substring(0, 1)) - rankOrder.indexOf(b.substring(0, 1));
                }
            });
            setTrumpSuit(() => data.trump);
            console.log("Hand: " + data.hand);
            toast.success("Welcome to the game, " + profile.name + "!");
            const toSuit = (s) => (s === 'C') ? "Clubs" : (s === 'D') ? "Diamonds" : (s === 'S') ? "Spades" : "Hearts";
            const toRank = (r) => (r === '9') ? "Nine" : (r === 'J') ? "Jack" : (r === 'Q') ? "Queen" : (r === 'K') ? "King" : (r === 'T') ? "Ten" : (r === 'A') ? "Ace" : "";
            setCards(data.hand.map((c, i) => {
                return (
                    <div key={i} className="pgv-card" style={{ cursor: "pointer" }}>
                        <PlayingCard 
                            suit={toSuit(c.substring(1, 2))} 
                            rank={toRank(c.substring(0, 1))} 
                            trump={trumpSuit === toSuit(c.substring(1, 2))} 
                            trumpColor={"blue"}
                            backFaceImage={cardBackImage}
                        />
                    </div>
                );
            }));
        });
    }, [profile.id, gameID, trumpSuit]);

    // TODO: Retrieve game settings from Supabase
    // const [trumpSuit, setTrumpSuit] = useState(_.sample(Object.keys(Suits)), []);
    // const [cardsFlipped, setCardsFlipped] = useState(_.fill(Array(12), false));
    // let deck = [];
    // console.log("Trump = " + trumpSuit);
    // const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    // const ranks = ["Nine", "Jack", "Queen", "King", "Ten", "Ace"];
    // for(var s = 0; s < suits.length; s++) {
    //     for(var r = 0; r < ranks.length; r++) {
    //         const index = s * ranks.length + r;
    //         const handleClick = () => {
    //             console.log("Card " + index + " clicked");
    //             const newCardsFlipped = cardsFlipped.map((c, i) => { return i === index ? !c : c; });
    //             console.log("Cards flipped:\n" + cardsFlipped + " ->\n" + newCardsFlipped);
    //             setCardsFlipped(newCardsFlipped);
    //             setCards(cards);
    //         };
    //         deck.push(
    //             <div key={index} className="pgv-card" onClick={handleClick} style={{ cursor: "pointer" }}>
    //                 <PlayingCard 
    //                     key={deck.length} 
    //                     suit={suits[s]} 
    //                     rank={ranks[r]} 
    //                     trump={trumpSuit === suits[s]} 
    //                     trumpColor={"blue"}
    //                     additionalClasses={`${cardsFlipped[index] ? "pc-flipped" : ""}`}
    //                     backFaceImage={cardBackImage}
    //                 />
    //             </div>
    //         );
    //     }
    // }
    // deck = _.shuffle(deck).slice(0, 2);
    // const [cards, setCards] = useState(deck);

    // function handleAddCard() {
    //     let suit = _.sample(Object.keys(Suits));
    //     let rank = _.sample(["Nine", "Jack", "Queen", "King", "Ten", "Ace"]);
    //     const index = cards.length < 12 ? cards.length : 0;
    //     const handleClick = () => {
    //         console.log("Card " + index + " clicked");
    //         const newCardsFlipped = cardsFlipped.map((c, i) => { return i === index ? !c : c; });
    //         console.log("Cards flipped:\n" + cardsFlipped + " ->\n" + newCardsFlipped);
    //         setCardsFlipped(() => newCardsFlipped);
    //     }
    //     let newCard = 
    //         <div key={index} className="pgv-card" onClick={handleClick} style={{ cursor: "pointer" }}>
    //             <PlayingCard  
    //                 suit={suit} 
    //                 rank={rank} 
    //                 trump={trumpSuit === suit} 
    //                 trumpColor={"blue"}
    //                 additionalClasses={`${cardsFlipped[index] ? "pc-flipped" : ""}`} 
    //                 backFaceImage={cardBackImage}
    //             />
    //         </div>;
    //     // let newCard = _.sample(deck);
    //     if(cards.length < 12) {
    //         setCards([...cards.slice(0), newCard]);
    //     } else {
    //         setCards([newCard]);
    //     }
    // }
    return (
        <div className="pgv-game-page">

            {trumpSuit && <div className="pgv-trump-label">Trump: {trumpSuit}</div>}
            
            {/* Cards */}
            {/* <div className="pgv-cards-container">
                {deck}
            </div> */}
            {/* Add card button */}
            {/* <motion.button className="pgv-add-card-button" style={{ marginBottom: "2vmin" }} whileTap={{ translate: "0% 5%"}} transition={{ duration: 0.05 }} onClick={handleAddCard}>
                Add Card
            </motion.button> */}

            {/* Player Hands */}
            <div className="pgv-player-cards-container">
                {cards}
            </div>
            {/* Player Bids */}
            {/* Scorecard */}
            {/* Rules */}

        </div>
    );
    /*
        - Buttons
            - Invite players to join
            - Leave game
            - Start game
            - Continue to next round
            - Start a new game
            - Bids
            - Pass
            - Trump suit
            - Throw In
            - Misdeal
            - Shoot the moon
            - Scores
            - Rules
            - Settings
        - Cards
            - Deal to all players
            - Player hands
            - Highlight meld for each suit
            - Highlight meld to score
            - Show meld
            - Play a card
        - Label
            - Players
            - Rules
            - Scores
            - Settings
            - Bids
            - Meld
            - Trump
            - Target bid
    */
}

export default PinochleGameView;