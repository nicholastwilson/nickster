import { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Media from 'react-media';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AuthProvider from './features/auth/AuthProvider';
import ProtectedRoute from './features/auth/ProtectedRoute';
// import LoginPage from './pages/login/LoginPopup';
import GamesPage from './pages/games/GamesPage';
import NotFoundPage from './features/routing/NotFoundPage';
import OrientationWarning from './features/devices/OrientationWarning';

import './App.scss';

function App() {
    const nodeRef = useRef(null);
    const location = useLocation();
    return (
        <Media query='(orientation: landscape) and (pointer: coarse)'>
            {matches =>
                matches ? (
                    <OrientationWarning />
                ) : (
                    <TransitionGroup>
                        <CSSTransition nodeRef={nodeRef} key={location?.key} classNames='app' timeout={200}>
                            <AuthProvider>
                                <Routes location={location}>
                                    <Route path='/games/*' element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
                                    <Route path='*' element={<NotFoundPage />} />
                                </Routes>
                            </AuthProvider>
                        </CSSTransition>
                    </TransitionGroup>
                )
            }
        </Media>
    );
}

export default App;