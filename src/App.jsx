import { Routes, Route, useLocation } from "react-router-dom";
import Media from "react-media";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import GamesPage from "./pages/games/GamesPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import OrientationWarning from "./pages/orientationwarning/OrientationWarning";
import "./App.scss";

function App() {
    const location = useLocation();
    return (
        <Media query="(orientation: landscape) and (pointer: coarse)">
            {matches =>
                matches ? (
                    <OrientationWarning />
                ) : (
                    <TransitionGroup>
                        <CSSTransition key={location?.key} classNames="app" timeout={200}>
                            <Routes location={location}>
                                <Route exact path="/games/*" element={<GamesPage />} />
                                <Route exact path="*" element={<NotFoundPage />} />
                            </Routes>
                        </CSSTransition>
                    </TransitionGroup>
                )
            }
        </Media>
    );
}

export default App;