import { useEffect, useMemo, useState } from "react";
import { signal } from "@preact/signals-react";
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
    
    // Game settings
    const [gameRules, setGameRules] = useState({
        targetScore: 0,  // 150, 250, 300
        meldSpeed: null,  // "very slow", "slow", "medium", "fast", "very fast"
        allowMisdeal: null  // true, false
    });

    // Game state
    const [gamePhase, setGamePhase] = useState("loading");  // "loading", "joining", "bidding", "declaring", "passing", "tricks", "summary", ...
    const [playerPosition, setPlayerPosition] = useState(null);  // Player position in the game (1-4)
    const [playerNames, setPlayerNames] = useState(null);  // Player names, starting from this player and going clockwise around the table: ["Mickey", "Goofy", "Donald", "Nick"]
    const [teamPlayers, setTeamPlayers] = useState(null);  // Pairs of player positions for each team: [ [1, 3], [2, 4] ]
    const [roundScores, setRoundScores] = useState(null);  // Scores for each round: [ [42, 13], [-37, 7], [5, 44], ... ]
    const [roundHands, setRoundHands] = useState(null);  // Hands for each round: [ [ ["AH", "JD", ...], ["QS", "9C", ...], [...], [...] ], ... ]

    // Round state
    const [dealingPlayer, setDealingPlayer] = useState(null);  // Player who is dealing (1-4)
    const [playerHand, setPlayerHand] = useState(null);  // Player hand: ["AH", "JD", ...]
    const [playerHandCounts, setPlayerHandCounts] = useState(null);  // Number of cards for each player: [ 12, 12, 11, 11 ]
    const [declaringPlayer, setDeclaringPlayer] = useState(null);  // Player who won the bid and declares trump
    const [trumpSuit, setTrumpSuit] = useState(null);  // Trump suit for the round
    const [playerMelds, setPlayerMelds] = useState(null);  // Player meld points: [ 22, 5, 3, 6 ]
    const [playerScores, setPlayerScores] = useState(null);  // Player meld and trick scores: [ 22, 5, 3, 6 ]

    /*
        |--------------------|------------------------------------------------------------------|---------------------------------------------|----------------------------------------------|-------------------|
        | Action             | Description                                                      | Function                                    | Data Changes                                 | Event Emitted     |
        |--------------------|------------------------------------------------------------------|---------------------------------------------|----------------------------------------------|-------------------|
        | Join Game          | Players join the game                                            | join_game() → game_settings                 | NEW game_players                             | player-joined     |
        |                    | Players retrieve game settings                                   | get_game_settings()                         | GET games.settings                           |                   |
        | Start Round        | Players signal to start a round                                  | pinochle_start_round() → round_started      | SET dealer, player_hands, initial_hands      | round-started     |
        |                    | Players retrieve initial game state                              | get_game_state()                            | GET games.state                              |                   |
        | Bidding            | Players take turns bidding, passing, or calling for a misdeal    | pinochle_bid(bid)                           | SET player_bids                              | player-bid        |
        |                    |                                                                  | pinochle_pass()                             | SET player_bids                              | player-passed     |
        |                    |                                                                  | pinochle_misdeal()                          | SET player_hands, player_bids                | player-misdeals   |
        | Declare Trump      | Player with the highest bid declares trump                       | pinochle_declare_trump(suit)                | SET target_score, trump_suit                 | trump-declared    |
        | Partner Pass       | Partner passes cards to declaring player                         | pinochle_partner_pass(cards)                | SET player_hands                             | partner-passed    |
        | Declarer Pass      | Declarer passed cards back to partner                            | pinochle_declarer_pass(cards)               | SET player_hands                             | declarer-passed   |
        | Declarer Throws In | Declarer throws in the hand voluntarily                          | pinochle_throw_in()                         |                                              | hand-thrown-in    |
        | Shoot the Moon     | Declarer indicates that they will attempt to shoot the moon      | pinochle_shoot_the_moon()                   | SET shoot_the_moon, target_score             | shooting-the-moon |
        | Choose Meld        | Players choose meld to score                                     | pinochle_meld()                             | SET player_melds, player_scores              | player-melded     |
        | Declarer Forfeits  | Declarer's team is unable to score enough points to make the bid | pinochle_fail_bid()                         |                                              | failed-bid        |
        | Play Card          | Player plays a card from their hand                              | pinochle_play_card() → winning_player       | SET trick_cards, player_hands, player_scores | card-played       |
        | End Round          | The round ends, scores are totaled, and summary is shown         | pinochle_get_round_summary() → player_hands | SET team_scores                              |                   |
        | Leave Game         | Player leaves the game                                           | leave_game()                                | SET game_players                             | player-left       |
        |--------------------|------------------------------------------------------------------|---------------------------------------------|----------------------------------------------|-------------------|

        Game Phases
            - Create Game
                1. create_game(type, settings) ──► { game_id: "ABCD", position: # }
                2. Share link: "...nickster/#/game/play/ABCD"
            - Join Game
                1. join_game(game_id) ──► { position: #, settings: {...} }
                2. get_game_state(profile_id, game_id) ──► {...}
                3. Supabase.channel('schema-db-changes').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'games', filter: 'game_id=eq.${game_id}' }, payload => { })
            - Start Round
            - Bidding
            - Declare Trump
            - Partner Pass
            - Declarer Pass
            - Declarer Throws In
            - Shoot the Moon
            - Choose Meld
            - Declarer Forfeits
            - Play Card
            - End Round
            - Leave Game
            
        Game State
            - Game settings
            - Phase
            - Dealer
            - Initial Hands
            - Player bids
        Player State
            - Hand
            - 



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

    // Retrieve game state
    useEffect(() => {
        if(!profile.id || !gameID) {
            return;
        }
        Supabase.rpc("get_game_state", { profile_id: profile.id, game_id: gameID }).then(res => {
            console.log("Response: " + JSON.stringify(res));
            if(res.status !== 200) {
                toast.error("Error communicating with Nickster server");
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
            toast.success("Welcome, " + profile.name + "!");
            const toSuit = (s) => (s === "C") ? "Clubs" : (s === "D") ? "Diamonds" : (s === "S") ? "Spades" : "Hearts";
            const toRank = (r) => (r === "9") ? "Nine" : (r === "J") ? "Jack" : (r === "Q") ? "Queen" : (r === "K") ? "King" : (r === "T") ? "Ten" : (r === "A") ? "Ace" : "";
            setPlayerHand(data.hand.map((c, i) => {
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

        // Test changing game mode
        setTimeout(() => {
            setGamePhase("bidding");
        }, 2000);
    }, [profile.id, gameID, trumpSuit]);

    const loadingView = (
        <div className="pgv-loading-text">Loading...</div>
    );
    return (
        <>
            {gamePhase === "loading" && loadingView}

            {gamePhase === "bidding" && <div className="pgv-game-page">

                {trumpSuit && <div className="pgv-trump-label"><div style={{display: "inline-block", color: trumpSuit == "Hearts" || trumpSuit == "Diamonds" ? "red" : "black"}}>{Suits[trumpSuit].symbol}</div></div>}
                
                {/* Cards */}
                {/* <div className="pgv-cards-container">
                    {deck}
                </div> */}
                {/* Add card button */}
                {/* <motion.button className="pgv-add-card-button" style={{ marginBottom: "2vmin" }} whileTap={{ translate: "0% 5%"}} transition={{ duration: 0.05 }} onClick={handleAddCard}>
                    Add Card
                </motion.button> */}

                {/* Player Bids */}
                
                {/* Player ID */}
                <div className="pgv-player-id">
                    {profile.name}
                </div>
                {/* Player Hands */}
                <div className="pgv-player-cards-container">
                    {playerHand}
                </div>
                {/* Scorecard */}
                {/* Rules */}

            </div>}
        </>
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
}

export default PinochleGameView;