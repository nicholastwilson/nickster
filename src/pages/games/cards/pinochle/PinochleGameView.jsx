import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion} from "framer-motion";
import _ from "lodash";

import PlayingCard, {Suits} from "../PlayingCard";
import cardBackImage from "assets/images/games/cards/card-back.png";

import "./PinochleGameView.scss";
import useTimeout from "hooks/useTimeout";

function PinochleGameView() {
    const { gameID } = useParams();
    // TODO: Retrieve game settings from Supabase
    const [cards, setCards] = useState([]);
    const trumpSuit = useMemo(() => _.sample(Object.keys(Suits)), [Suits]);
    const [cardsFlipped, setCardsFlipped] = useState(_.fill(Array(12), false));
    // const deck = useMemo(() => {
    //     console.log("Trump = " + trumpSuit);
    //     const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    //     const ranks = ["Nine", "Jack", "Queen", "King", "Ten", "Ace"];
    //     const deck = [];
    //     for(var s = 0; s < suits.length; s++) {
    //         for(var r = 0; r < ranks.length; r++) {
    //             deck.push(<PlayingCard key={deck.length} suit={suits[s]} rank={ranks[r]} trump={trumpSuit === suits[s]}  backFaceImage={cardBackImage} />);
    //         }
    //     }
    //     return deck;
    // }, [trumpSuit]);
    function handleAddCard() {
        let suit = _.sample(Object.keys(Suits));
        let rank = _.sample(["Nine", "Jack", "Queen", "King", "Ten", "Ace"]);
        const index = cards.length;
        const handleClick = () => {
            console.log("Card " + index + " clicked");
            setCardsFlipped(cardsFlipped.map((c, i) => { return i === index ? !c : c; }));
        }
        let newCard = <PlayingCard 
            key={cards.length} 
            suit={suit} 
            rank={rank} 
            trump={trumpSuit === suit} 
            trumpColor={"blue"}
            additionalClasses={`${cardsFlipped[index] ? "pc-flipped" : ""}`} 
            onClick={handleClick}
            backFaceImage={cardBackImage}
        />;
        // let newCard = _.sample(deck);
        if(cards.length < 12) {
            setCards([...cards.slice(0), newCard]);
        } else {
            setCards([newCard]);
        }
    }
    return (
        <div className="pgv-game-page">
            <div style={{ marginTop: "2vmin" }}>Game ID: {gameID}</div>
            <div style={{ marginBottom: "2vmin" }}>Trump: {trumpSuit}</div>
            {/* Cards */}
            <div className="cards-container">
                {cards}
            </div>
            {/* Add card button */}
            <motion.button className="add-card-button" style={{ marginBottom: "2vmin" }} whileTap={{ translate: "0% 5%"}} transition={{ duration: 0.05 }} onClick={handleAddCard}>
                Add Card
            </motion.button>
        </div>
    );
}

export default PinochleGameView;