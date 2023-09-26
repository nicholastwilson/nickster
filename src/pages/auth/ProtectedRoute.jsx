import { useSelector } from "react-redux";

import LoginPage from 'pages/auth/LoginPage';

import './ProtectedRoute.scss';

const ProtectedRoute = ({ element }) => {
    const profile = useSelector(state => state.profile);
    return profile?.validated ? element : <LoginPage />;
};

export default ProtectedRoute;
