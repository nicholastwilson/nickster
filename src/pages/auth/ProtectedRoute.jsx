import { useSelector } from "react-redux";

import LoginPage from 'pages/auth/LoginPage';

import './ProtectedRoute.scss';

const ProtectedRoute = ({ element }) => {
    const profileID = useSelector(state => state.profile.id);
    return profileID ? element : <LoginPage />;
};

export default ProtectedRoute;
