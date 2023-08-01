import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";

import useAuth from "./useAuth";

const AuthRoute = ({ children }) => {
    const { authToken } = useAuth();
    const location = useLocation();

    if (!authToken) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default AuthRoute;