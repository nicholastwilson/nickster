import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Supabase from "features/storage/Supabase";

import useDebouncedTimer from "hooks/useDebouncedTimer.js";
import { ReactComponent as NicksterLogo } from "assets/images/app/nickster_logo.svg";
import PlayingCard from "./cards/PlayingCard";

import "./GamesView.scss";

export default function GamesView() {
    const navigate = useNavigate();
    const sb = Supabase;
    const [logoAnimating, triggerLogoAnimating] = useDebouncedTimer(500, 750, 1000);
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        setAuthUser(sb.auth.getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="gv-page">
            {/* Header title & logo */}
            <NicksterLogo className={`gv-logo ${logoAnimating ? "spinning" : ""}`} onClick={triggerLogoAnimating}/>
            <div className="gv-title">Nickster</div>
            <div className="gv-subtitle">Games</div>
            {authUser ? (
                <div className="gv-login-button" onClick={() => navigate("games")}/>
            ) : (
                <div className="gv-login-button" onClick={() => navigate("login")}/>
            )}
            {/* Game buttons */}
            <div className="gv-game-button gv-pinochle-button" onClick={() => navigate("pinochle")}>
                <div className="gv-game-card gv-pinochle-card-jack"><PlayingCard suit="Diamonds" rank="Jack" /></div>
                <div className="gv-game-card gv-pinochle-card-queen"><PlayingCard suit="Spades" rank="Queen" /></div>
                <div className="gv-game-text gv-pinochle-text">Pinochle</div>
            </div>
        </div>
    );
}