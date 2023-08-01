import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useLocalStorage from "features/storage/useLocalStorage";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useLocalStorage("authToken", null);
    console.log(`[AuthProvider] authToken: ${authToken}`);
    // console.trace();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = () => {
        // TODO: Login user and set authentication token
        const uuid = crypto.randomUUID();
        setAuthToken(uuid);
        console.log(`Logged in as ${uuid} (navigating to ${location.state?.from?.pathname})`);
        // console.trace();
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