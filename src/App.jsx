import { Routes, Route } from 'react-router-dom';
import GamesPage from './pages/games/GamesPage';
import NotFoundPage from './pages/notfound/NotFoundPage';
import './App.scss';

function App() {
    return (
        <Routes>
            {/* <Route exact path="/" element={<div>Home Page</div>} /> */}
            <Route exact path="/games/*" element={<GamesPage />} />
            <Route exact path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;