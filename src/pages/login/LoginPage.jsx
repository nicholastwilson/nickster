import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
// import _ from "lodash";
import Supabase from "features/storage/Supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

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

    const handleLoginUser = async () => {
        setEnableControls(false);
        setTimeout(() => {
            toast.success("Logged in!");
            setEnableControls(true);
        }, 2000);
        // toast.info("Logging in...");
        // const { data, error } = await sb.auth.signInWithPassword({
        //     email,
        //     password
        // });
        // if(data) {

        // } else {

        //     console.log(error);
        // }


        // console.log(window.location.origin + window.location.pathname);
        // setTimeout(async () => {
        //     let { data, error } = await sb.auth.signInWithOAuth({
        //         provider: 'github',
        //         // queryParams: {
        //         //     redirect_uri: window.location.origin + window.location.pathname
        //         // },
        //         // options: {
        //         //     // redirectTo: window.location.origin + window.location.pathname,
        //         //     skipBrowserRedirect: true,
        //         // }
        //     });
        //     console.log("[handleLogin] data=" + JSON.stringify(data) + " error=" + JSON.stringify(error));
        // }, 1000);

        // let { data, error } = await Supabase.auth.updateUser({
        //     password: newPassword,
        // });
        // if (data) alert("Password updated successfully!")
        // if (error) alert("There was an error updating your password.")

        // setEnableControls(true);
    };

    const handleLoginAsGuest = async () => {
        setEnableControls(false);
        setTimeout(() => {
            toast.success("Logged in as guest!");
            setEnableControls(true);
        }, 2000);
    }

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
            {/* <div className="login-form-outer-container"> */}
                <div className="login-form-container">
                    <div className="login-header-container">
                        <div className="login-header">Login</div>
                    </div>
                    <input className="login-email-input" type="text" placeholder="&#9993; Email" disabled={!enableControls} onChange={e => setEmail(e.target.value)} />
                    <input className="login-password-input" type="password" placeholder="&#128274;&#xfe0e; Password" disabled={!enableControls} onChange={e => setPassword(e.target.value)} />
                    <button className="login-button" disabled={!enableControls} onClick={handleLoginUser}>Login</button>
                    <div className="login-or-container">
                        <div className="login-or-line"></div>
                        <div className="login-or-text">OR</div>
                        <div className="login-or-line"></div>
                    </div>
                    <button className="login-guest-button" disabled={!enableControls} onClick={handleLoginAsGuest}>Continue as Guest</button>
                </div>
            {/* </div> */}

        </div>
    );
}

export default LoginPage;