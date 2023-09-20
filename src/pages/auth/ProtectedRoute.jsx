import { useState, useEffect } from 'react';

import * as Auth from 'features/auth/Auth';
import LoginPage from 'pages/auth/LoginPage';
import useInterval from 'hooks/useInterval';
import useLocalStorage from 'hooks/useLocalStorage';
import { ReactComponent as NicksterLogo } from "assets/images/app/nickster_logo.svg";

import './ProtectedRoute.scss';

const ProtectedRoute = ({ element }) => {
    // Loading state
    const [state, setState] = useState("loading");
    const [loadingRotation, setLoadingRotation] = useState((Date.now() * 0.03333) % 360);
    useInterval(() => setLoadingRotation((Date.now() * 0.03333) % 360), 16);  // ~60fps

    // Login state
    const [profileID, setProfileID] = useLocalStorage(Auth.LOCALSTORAGE_KEY_NICKSTER_PROFILE_ID);
    useEffect(() => {
        setTimeout(() => {
            if(profileID) {
                setState("protected");
            } else {
                setState("login");
            }
        });
    }, [profileID]);

    // User is logged in; allow access to the original route
    if(state === "loading") {
        return (
            <div className="protected-route-loading-container">
                <NicksterLogo className="protected-route-loading-logo" style={{ rotate: `${loadingRotation}deg` }} />
                <h1 className="protected-route-loading-text" onClick={() => setState("login")}>Loading...</h1>
            </div>
        );
    } else if(state === "login") {
        return <LoginPage setProfileID={setProfileID} />
    } else {
        return element;
    }
};

export default ProtectedRoute;
