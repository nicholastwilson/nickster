import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCircleNotch, faBugSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

import Supabase from "features/storage/Supabase";
import { setProfile } from "features/auth/profileSlice";
import useDebouncedTimer from "hooks/useDebouncedTimer.js";

import "./LoginPage.scss";

function LoginPage() {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [logoAnimating, triggerLogoAnimating] = useDebouncedTimer(1000, 1000);
    const [showingForm, setShowingForm] = useState(false);
    const [enableControls, setEnableControls] = useState(true);
    const [loggingIn, setLoggingIn] = useState(false);
    const [guestLoggingIn, setGuestLoggingIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(!profile?.user_id && profile?.name ? profile.name : "");
    const [showDebug, setShowDebug] = useState(false);
    const emailFieldRef = useRef(null);
    const passwordFieldRef = useRef(null);
    const nameFieldRef = useRef(null);
    
    // Show login form on initial render
    useEffect(() => {
        // Show login form
        setShowingForm(true);
        // Configure fields
        setTimeout(() => {
            nameFieldRef.current.value = (profile?.name ? profile.name : "");
            nameFieldRef.current.select();
        }, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLoginUser = function() {
        // Check for input
        if(!email || !password) {
            toast.error("Enter email and password");
            emailFieldRef.current.select();
            return;
        }
        // Login user
        setEnableControls(false);
        setLoggingIn(true);
        // Sign out Supabase user profile first
        if(profile?.user_id)
            Supabase.auth.signOut();
        Supabase.auth.signInWithPassword({ email, password }).then(({ data, error }) => {
            // Login failed
            if(error) {
                toast.error(error.message);
                setTimeout(() => emailFieldRef.current.select(), 0);
                setLoggingIn(false);
                setEnableControls(true);
            }
            // Login succeeded
            else {
                // Retrieve profile using email
                Supabase.rpc('get_authenticated_user_profile', { email }).then(({ data, error }) => {
                    // Failed to get profile
                    if(error) {
                        toast.error(error.message);
                        setTimeout(() => emailFieldRef.current.select(), 0);
                    }
                    // Profile successfully retrieved
                    else {
                        dispatch(setProfile({ ...data, validated: true }));
                        setEmail("");
                        setPassword("");
                        emailFieldRef.current.value = "";
                        passwordFieldRef.current.value = "";
                        toast.success("Welcome back, " + data.name + "!");
                    }
                    setLoggingIn(false);
                    setEnableControls(true);
                });
            }
        });
    };
    
    const handleGuestLogin = function() {
        // Check for input
        if(!name) {
            toast.error("Enter a name");
            nameFieldRef.current.select();
            return;
        }
        // Guest login
        setEnableControls(false);
        setGuestLoggingIn(true);
        // Create guest profile
        if(!profile?.id) {
            Supabase.rpc('create_guest_profile', { name }).then(({ data, error }) => {
                // Login failed
                if(error) {
                    toast.error(error.message);
                    setTimeout(() => nameFieldRef.current.select(), 0);
                }
                // Login succeeded
                else {
                    dispatch(setProfile({ ...data, validated: true }));
                    toast.success("Welcome, " + name + "!");
                }
                setGuestLoggingIn(false);
                setEnableControls(true);
            });
        }
        // Update guest profile
        else {
            Supabase.rpc("update_user_profile", {
                "id": profile.id,
                "user_id": profile.user_id,
                "name": name,
                "preferences": profile.preferences
            }).then(({ data, error }) => {
                // Profile update failed
                if(error || data?.success === false) {
                    toast.error(error ? error.message : data.message);
                    setTimeout(() => nameFieldRef.current.select(), 0);
                }
                // Profile update succeeded
                else {
                    dispatch(setProfile({ ...profile, name: name, validated: true }));
                    toast.success("Welcome, " + name + "!");
                }
                setGuestLoggingIn(false);
                setEnableControls(true);
            });
        }
    };

    return (
        <div className="login-page">

            {/* Header title & logo */}
            <div className="login-title-container">
                {/* Title */}
                <div className="login-nickster-text">Nickster</div>
                <div className="login-subtitle-text">{profile?.id ? "Profile" : "Welcome"}</div>
                {/* Logo */}
                <div className="login-logo" onClick={triggerLogoAnimating}>
                    <FontAwesomeIcon className="login-logo" icon={faCircleUser} />
                    <div className={`red-line ${logoAnimating ? "scanning-vertical" : ""}`} />
                </div>
            </div>

            {/* Debug button */}
            <div className="login-debug-button" onClick={() => setShowDebug(!showDebug)}>
                <FontAwesomeIcon className={`login-debug-logo ${showDebug ? "display-debug" : ""}`} icon={faBugSlash} />
            </div>
            {showDebug && <div className="login-debug-container" hidden={!showDebug}>
                {Object.keys(localStorage).map(key => (
                    <div className="login-debug-text">{key + " = " + JSON.stringify(JSON.parse(localStorage.getItem(key)), null, 2)}</div>
                ))}
            </div>}

            {/* Login form */}
            <div className={`login-form-outer-container ${showingForm ? "pop-in" : ""}`}>
                <div className="login-form-container">
                    {/* Header */}
                    <div className="login-header-container">
                        <div className="login-header">{profile?.id ? "Profile" : "Login"}</div>
                    </div>
                    {/* Authenticated Login */}
                    <div classname="login-email-field-container">
                        <div className="login-email-label">Email:</div>
                        <input className="login-email-input" type="text" ref={emailFieldRef} placeholder="&#9993; Email" autoFocus disabled={!enableControls} onChange={e => setEmail(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleLoginUser()} />
                    </div>
                    <input className="login-password-input" type="password" ref={passwordFieldRef} placeholder="&#128274;&#xfe0e; Password" disabled={!enableControls} onChange={e => setPassword(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleLoginUser()} />
                    <button className="login-button" disabled={!enableControls} onClick={handleLoginUser}>
                        <FontAwesomeIcon className={`login-button-icon ${loggingIn ? "fa-spin" : ""}`} icon={faCircleNotch} />
                        <div className="login-button-text" disabled={!enableControls}>Login</div>
                    </button>
                    {/* Separator */}
                    <div className="login-or-container">
                        <div className="login-or-line"></div>
                        <div className="login-or-text">OR</div>
                        <div className="login-or-line"></div>
                    </div>
                    {/* Guest Login */}
                    <input className="login-guest-name-input" type="text" ref={nameFieldRef} placeholder="&#x1F604;&#xfe0e; Name" disabled={!enableControls} onChange={e => setName(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleGuestLogin()} />
                    <button className="login-guest-button" disabled={!enableControls} onClick={handleGuestLogin}>
                        <FontAwesomeIcon className={`login-button-icon ${guestLoggingIn ? "fa-spin" : ""}`} icon={faCircleNotch} />
                        <div className="login-button-text" disabled={!enableControls}>{profile?.id ? "Update" : "Guest"}</div>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;