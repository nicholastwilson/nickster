import { useEffect, useState } from "react";
// import _ from "lodash";
import Supabase from "features/storage/Supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

// import useAuth from "features/auth/useAuth";
import useDebouncedTimer from "hooks/useDebouncedTimer.js";

import "./LoginPage.scss";

const LoginPage = () => {
    // const { authToken, handleLogin } = useAuth();
    const [logoAnimating, triggerLogoAnimating] = useDebouncedTimer(1000, 1000);
    const [enableControls, setEnableControls] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const sb = Supabase;

    // useEffect(() => {
    //     (async () => {
    //         console.log("[useEffect] Get session...");
    //         const { data, error } = await Supabase.auth.getSession();
    //         console.log("[useEffect] data=" + JSON.stringify(data) + " error=" + JSON.stringify(error));
    //     })();
    // }, []);

    const handleLogin = async () => {
        console.log("Logging in...");
        setEnableControls(false);

        // sb.auth.signInWithPassword({
        //     email,
        //     password
        // })
        console.log(window.location.origin + window.location.pathname);
        setTimeout(async () => {
            let { data, error } = await sb.auth.signInWithOAuth({
                provider: 'github',
                // queryParams: {
                //     redirect_uri: window.location.origin + window.location.pathname
                // },
                // options: {
                //     // redirectTo: window.location.origin + window.location.pathname,
                //     skipBrowserRedirect: true,
                // }
            });
            console.log("[handleLogin] data=" + JSON.stringify(data) + " error=" + JSON.stringify(error));
        }, 1000);

        // let { data, error } = await Supabase.auth.updateUser({
        //     password: newPassword,
        // });
        // if (data) alert("Password updated successfully!")
        // if (error) alert("There was an error updating your password.")

        setEnableControls(true);
    };

    return (
        <div className="login-page">

            {/* Header title & logo */}
            <div className="login-nickster-text">Nickster</div>
            <div className="login-subtitle-text">Welcome</div>
            <div className="login-logo" onClick={triggerLogoAnimating}>
                <FontAwesomeIcon className="login-logo" icon={faCircleUser} />
                <div className={`red-line ${logoAnimating ? "scanning-vertical" : ""}`} />
            </div>

            {/* Credentials form */}
            <div className="login-form-container">
                <input className="login-email-input" type="text" placeholder="Email" disabled={!enableControls} onChange={e => setEmail(e.target.value)} />
                <input className="login-password-input" type="password" placeholder="Password" disabled={!enableControls} onChange={e => setPassword(e.target.value)} />
                <button className="login-button" disabled={!enableControls} onClick={handleLogin}>Login</button>
            </div>

        </div>
    );

    // return (
    //     <div className="login-page">

    //         {/* Header title & logo */}
    //         <div className="login-nickster-text">Nickster</div>
    //         <div className="login-subtitle-text">Welcome</div>
    //         <FontAwesomeIcon className="icon" icon={faUser} />
    //         <div className="login-card-jack" onClick={() => animateFlip(jackFlipping, setJackFlipping)}>
    //             <PlayingCard suit="Diamonds" rank="Jack" additionalClasses={`${jackFlipping ? "pc-flipped" : ""}`} backFaceImage={cardBackImage} />
    //         </div>
    //         <div className="login-card-queen" onClick={() => animateFlip(queenFlipping, setQueenFlipping)}>
    //             <PlayingCard suit="Spades" rank="Queen" additionalClasses={`${queenFlipping ? "pc-flipped" : ""}`} backFaceImage={cardBackImage} />
    //         </div>

    //         {/* New & Join buttons */}
    //         <button className={`login-game-button login-new-game-button ${view === "start" ? "login-fade-in" : "login-fade-out"}`} onClick={() => setView("new")}>
    //             <FontAwesomeIcon className="icon" icon={faCirclePlus} style={{ marginRight: "2vmin" }} />
    //             <div className="login-button-text-container">
    //                 <div className="login-button-text">New</div>
    //                 <div className="login-button-subtext">Start a new game</div>
    //             </div>
    //         </button>
    //         <button className={`login-game-button login-join-game-button ${view === "start" ? "login-fade-in" : "login-fade-out"}`} onClick={() => setView("join")}>
    //             <FontAwesomeIcon className="icon" icon={faRightToBracket} style={{ marginRight: "2vmin" }} />
    //             <div className="login-button-text-container">
    //                 <div className="login-button-text">Join</div>
    //                 <div className="login-button-subtext">Join an existing game</div>
    //             </div>
    //         </button>

    //         {/* New game settings view */}
    //         <div className={`login-rules-container ${view === "new" ? "login-fade-in" : "login-fade-out"}`}>
    //             <div className="login-rules-title"><u>Game Rules</u></div>
    //             <div className="login-rules-summary">{
    //                 "Play to " + (rules.play === "score" ? (rules.score + " points") : (rules.hands + " hands")) +
    //                 (rules.stickDealer === "yes" ? ", stick the dealer" : "") +
    //                 (rules.allowMisdeal === "yes" ? ", allow misdeals" : "") +
    //                 ", " + rules.meldSpeed + " meld speed"
    //             }</div>
    //             {createRulesOptionsElements("Play", "play", ["score", "hands"], ["To Score", "# of Hands"])}
    //             {rules.play === "score" && createRulesOptionsElements("To Score", "goal", [150, 200, 250], ["150", "200", "250"])}
    //             {rules.play === "hands" && createRulesOptionsElements("# of Hands", "goal", [4, 5, 6], ["4", "5", "6"])}
    //             {createRulesOptionsElements("Stick the Dealer", "stickDealer", ["yes", "no"], ["Yes", "No"])}
    //             {createRulesOptionsElements("Allow Misdeal", "allowMisdeal", ["yes", "no"], ["Yes", "No"])}
    //             {createRulesOptionsElements("Meld Speed", "meldSpeed", ["slow", "medium", "fast"], ["Slow", "Med", "Fast"])}
    //             <div className="login-rules-button-container">
    //                 <button className="login-rules-button" onClick={() => setView("start")}>
    //                     <FontAwesomeIcon className="icon" icon={faCircleArrowLeft} style={{ marginRight: "2vmin" }} />
    //                     <div className="login-rules-button-text">Back</div>
    //                 </button>
    //                 <button className="login-rules-button" onClick={createNewGame}>
    //                     <FontAwesomeIcon className="icon" icon={faCirclePlus} style={{ marginRight: "2vmin" }} />
    //                     <div className="login-rules-button-text">Create</div>
    //                 </button>
    //             </div>
    //         </div>

    //         {/* Join existing game view */}
    //         <div className={`login-join-container ${view === "join" ? "login-fade-in" : "login-fade-out"}`}>
    //             <div className="login-join-button-container">
    //                 <button className="login-join-button" onClick={() => setView("start")}>
    //                     <FontAwesomeIcon className="icon" icon={faCircleArrowLeft} style={{ marginRight: "2vmin" }} />
    //                     <div className="login-rules-button-text">Back</div>
    //                 </button>
    //                 <button className="login-join-button" style={{ fontSize: "5.5vmin" }} onClick={joinExistingGame}>
    //                     <FontAwesomeIcon className="icon" icon={faRightToBracket} style={{ marginRight: "2vmin" }} />
    //                     <div className="login-rules-button-text">Join</div>
    //                 </button>
    //             </div>
    //         </div>

    //     </div>
    // );


    // return (
    //     <div className="gv-page">
    //         {/* Header title & logo */}
    //         <NicksterLogo className={`gv-logo ${logoSpinning ? "spinning" : ""}`} onClick={spinLogo} />
    //         <div className="gv-title">Nickster</div>
    //         <div className="gv-subtitle">Games</div>
    //         {/* Game buttons */}
    //         <div className="gv-game-button gv-pinochle-button" onClick={() => navigate("pinochle")}>
    //             <div className="gv-game-card gv-pinochle-card-jack"><PlayingCard suit="Diamonds" rank="Jack" /></div>
    //             <div className="gv-game-card gv-pinochle-card-queen"><PlayingCard suit="Spades" rank="Queen" /></div>
    //             <div className="gv-game-text gv-pinochle-text">Pinochle</div>
    //         </div>
    //     </div>
    // );


    // return (
    //     <div>
    //         <h1>Login Page</h1>
    //         <div>Logged in as {authToken}</div>
    //         <button type="button" onClick={handleLogin}>Login</button>
    //     </div>
    // );
}

export default LoginPage;