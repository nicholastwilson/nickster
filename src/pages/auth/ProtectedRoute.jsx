import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginPage from 'pages/auth/LoginPage';
import useTimeout from 'hooks/useTimeout';
import useInterval from 'hooks/useInterval';
import { ReactComponent as NicksterLogo } from "assets/images/app/nickster_logo.svg";

import './ProtectedRoute.scss';

const ProtectedRoute = ({ element }) => {
    // Loading state
    const [state, setState] = useState("loading");
    const [loadingRotation, setLoadingRotation] = useState((Date.now() * 0.03333) % 360);
    useInterval(() => setLoadingRotation((Date.now() * 0.03333) % 360), 16);  // ~60fps
    useTimeout(() => setState("login"), 1000);

    // Login state
    const [profileID, setProfileID] = useState(null);
    useEffect(() => {
        const profileID = localStorage.getItem('profileID');
        setProfileID(profileID);
        if(profileID) {
            setState("protected");
        } else {
            setState("login");
        }
    }, []);

    // User is logged in; allow access to the original route
    if(state === "loading") {
        return (
            <div className="protected-route-loading-container">
                <NicksterLogo className="protected-route-loading-logo" style={{ rotate: `${loadingRotation}deg` }} />
                <h1 className="protected-route-loading-text" onClick={() => setState("login")}>Loading...</h1>
            </div>
        );
    } else if(state === "login") {
        return <LoginPage />
    } else {
        return element;
    }
};

export default ProtectedRoute;
