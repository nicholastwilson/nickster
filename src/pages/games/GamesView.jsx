import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as NicksterLogo } from "assets/images/app/nickster_logo.svg";
import PlayingCard from "./cards/PlayingCard";

import "./GamesView.scss";

export default function GamesView() {
    const navigate = useNavigate();

    // Logo spinning animation
    const [logoSpinning, setLogoSpinning] = useState(false);
    const spinLogo = useCallback(() => {
        if(logoSpinning)
            return;
        setLogoSpinning(true);
        setTimeout(() => {
            setLogoSpinning(false);
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Spin logo once after page loads
    useEffect(() => {
        setTimeout(() => {
            spinLogo();
        }, 1000);
    }, [spinLogo]);
    
    return (
        <div className="gv-page">
            {/* Header title & logo */}
            <NicksterLogo className={`gv-logo ${logoSpinning ? "spinning" : ""}`} onClick={spinLogo}/>
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