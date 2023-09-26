import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";

import { setProfile } from "features/auth/profileSlice";
import useDebouncedTimer from "hooks/useDebouncedTimer.js";
import { ReactComponent as NicksterLogo } from "assets/images/app/nickster_logo.svg";
import PlayingCard from "./cards/PlayingCard";

import "./GamesView.scss";

export default function GamesView() {
    const [logoAnimating, triggerLogoAnimating] = useDebouncedTimer(500, 750, 1000);
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleProfile() {
        dispatch(setProfile({ ...profile, validated: false }));
        navigate(0);
    };
    
    return (
        <div className="gv-page">
            {/* Header title & logo */}
            <NicksterLogo className={`gv-logo ${logoAnimating ? "spinning" : ""}`} onClick={triggerLogoAnimating}/>
            <div className="gv-title">Nickster</div>
            <div className="gv-subtitle">Games</div>
            {/* Sign out button */}
            <div className="gv-profile-button" onClick={handleProfile}>
                <FontAwesomeIcon className="gv-icon" icon={profile.user_id ? faUserShield : faUser} />
            </div>
            {/* Game buttons */}
            <div className="gv-game-button gv-pinochle-button" onClick={() => navigate("pinochle")}>
                <div className="gv-game-card gv-pinochle-card-jack"><PlayingCard suit="Diamonds" rank="Jack" /></div>
                <div className="gv-game-card gv-pinochle-card-queen"><PlayingCard suit="Spades" rank="Queen" /></div>
                <div className="gv-game-text gv-pinochle-text">Pinochle</div>
            </div>
        </div>
    );
}