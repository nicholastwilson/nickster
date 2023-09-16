import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Media from "react-media";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./features/auth/ProtectedRoute";
import LoginPage from "./pages/login/LoginPage";
import GamesPage from "./pages/games/GamesPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import OrientationWarning from "./pages/orientationwarning/OrientationWarning";

import "./App.scss";
import LoginModal from "./features/auth/LoginModal";

function App() {
    const nodeRef = useRef(null);
    const location = useLocation();
    const profileID = localStorage.getItem("profileID");
    // console.log(profileID ? "Profile found: " + profileID : "No profile found");
    // const [showModal, setShowModal] = useState(false);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowModal(true);
    //     }, 1000);
    // }, []);
    return (
        <Media query="(orientation: landscape) and (pointer: coarse)">
            {matches =>
                matches ? (
                    <OrientationWarning />
                ) : (
                    <TransitionGroup>
                        <CSSTransition nodeRef={nodeRef} key={location?.key} classNames="app" timeout={200}>
                            <Routes location={location}>
                                {/* <Route path="/login" element={<LoginPage />} /> */}
                                <Route path="/" element={<Navigate to="/games" replace />} />
                                <Route path="/games/*" element={<ProtectedRoute element={<GamesPage />} />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </CSSTransition>
                        <Toaster/>
                    </TransitionGroup>
                )
            }
        </Media>
    );
}

export default App;