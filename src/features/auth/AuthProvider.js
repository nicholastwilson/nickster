import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = React.useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async () => {
        // TODO: Login user and set authentication token
        setAuthToken(crypto.randomUUID());
        navigate(location.state?.from?.pathname);
    };

    const handleLogout = () => {
        // TODO: Logout user and clear authentication token
        setAuthToken(null);
    };

    const value = {
        authToken,
        handleLogin,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;