import useAuth from "features/auth/useAuth";

import "./LoginPage.scss";

const LoginPage = () => {
    const { authToken, handleLogin } = useAuth();
    return (
        <div>
            <h1>Login Page</h1>
            <div>Logged in as {authToken}</div>
            <button type="button" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;