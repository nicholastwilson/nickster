import { Routes, Route } from 'react-router-dom';
import CardsPage from './pages/cards/CardsPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.scss';

function App() {
    return (
        <Routes>
            {/* <Route exact path="/" element={<div>Home Page</div>} /> */}
            <Route exact path="/cards/*" element={<CardsPage />} />
            <Route exact path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;