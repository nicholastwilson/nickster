import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useLocalStorage from "hooks/useLocalStorage";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useLocalStorage("authToken", null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = () => {
        // TODO: Login user and set authentication token
        const uuid = crypto.randomUUID();
        setAuthToken(uuid);
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

export { AuthContext };
export default AuthProvider;