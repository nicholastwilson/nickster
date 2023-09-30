import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "pages/auth/ProtectedRoute";
import GamesPage from "pages/games/GamesPage";
import NotFoundPage from "pages/notfound/NotFoundPage";
import OrientationWarning from "pages/orientationwarning/OrientationWarning";
import useDeviceDetect from "hooks/useDeviceDetect";

import "./App.scss";

function App() {
    const location = useLocation();
    const { isMobile } = useDeviceDetect();
    const [isLandscape, setLandscape] = useState(window.innerWidth > window.innerHeight);

    useEffect(() => {
        const handler = () => setLandscape(window.innerWidth > window.innerHeight);
        window.screen.orientation.addEventListener("change", handler);
        window.addEventListener("resize", handler);
        return () => {
            window.screen.orientation.removeEventListener("change", handler);
            window.removeEventListener("resize", handler);
        };
    }, []);
    return (
        isMobile && isLandscape ? (
            <OrientationWarning />
        ) : (
            <TransitionGroup>
                <CSSTransition key={location?.key} classNames="app" timeout={200}>
                    <Routes location={location}>
                        <Route path="/" element={<Navigate to="/games" replace />} />
                        <Route path="/games/*" element={<ProtectedRoute element={<GamesPage />} />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </CSSTransition>
                <Toaster />
            </TransitionGroup>
        )
    );
}

export default App;