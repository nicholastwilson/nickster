import { useNavigate } from "react-router-dom";

import useDebouncedTimer from "hooks/useDebouncedTimer.js";
import { ReactComponent as NicksterLogo } from "assets/images/app/nickster_logo.svg";
import PlayingCard from "./cards/PlayingCard";

import "./GamesView.scss";

export default function GamesView() {
    const navigate = useNavigate();
    const [logoAnimating, triggerLogoAnimating] = useDebouncedTimer(500, 750, 1000);
    
    return (
        <div className="gv-page">
            {/* Header title & logo */}
            <NicksterLogo className={`gv-logo ${logoAnimating ? "spinning" : ""}`} onClick={triggerLogoAnimating}/>
            <div className="gv-title">Nickster</div>
            <div className="gv-subtitle">Games</div>
            {/* Game buttons */}
            <div className="gv-game-button gv-pinochle-button" onClick={() => navigate("pinochle")}>
                <div className="gv-game-card gv-pinochle-card-jack"><PlayingCard suit="Diamonds" rank="Jack" /></div>
                <div className="gv-game-card gv-pinochle-card-queen"><PlayingCard suit="Spades" rank="Queen" /></div>
                <div className="gv-game-text gv-pinochle-text">Pinochle</div>
            </div>
        </div>
    );
}