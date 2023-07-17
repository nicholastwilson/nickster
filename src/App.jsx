import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import GamesPage from "./pages/games/GamesPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import "./App.scss";

function App() {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location?.key} classNames="app" timeout={200}>
                <Routes location={location}>
                    <Route exact path="/games/*" element={<GamesPage />} />
                    <Route exact path="*" element={<NotFoundPage />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default App;