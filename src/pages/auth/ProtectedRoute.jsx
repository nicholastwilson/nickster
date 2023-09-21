import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import LoginPage from 'pages/auth/LoginPage';
import useInterval from 'hooks/useInterval';

import './ProtectedRoute.scss';

const ProtectedRoute = ({ element }) => {
    // Loading state
    const [state, setState] = useState("loading");
    const [loadingRotation, setLoadingRotation] = useState((Date.now() * 0.03333) % 360);
    useInterval(() => setLoadingRotation((Date.now() * 0.03333) % 360), 16);  // ~60fps
    const profileID = useSelector(state => state.profile.id);
    const dispatch = useDispatch();

    // User is logged in; allow access to the original route
    if(!profileID) {
        return <LoginPage />
    } else {
        return element;
    }
};

export default ProtectedRoute;
