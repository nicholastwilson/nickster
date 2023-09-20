import { useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Media from "react-media";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "pages/auth/ProtectedRoute";
import GamesPage from "pages/games/GamesPage";
import NotFoundPage from "pages/notfound/NotFoundPage";
import OrientationWarning from "pages/orientationwarning/OrientationWarning";

import "./App.scss";

function App() {
    const nodeRef = useRef(null);
    const location = useLocation();
    return (
        <Media query="(orientation: landscape) and (pointer: coarse)">
            {matches =>
                matches ? (
                    <OrientationWarning />
                ) : (
                    <TransitionGroup>
                        <CSSTransition nodeRef={nodeRef} key={location?.key} classNames="app" timeout={200}>
                            <Routes location={location}>
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