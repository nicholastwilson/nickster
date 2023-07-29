import { useState } from "react";

const useAuth = () => {
    const [authToken, setAuthToken] = useState(null);
    return [authToken, setAuthToken];
};

export default useAuth;