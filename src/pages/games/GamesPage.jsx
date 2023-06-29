import { Routes, Route } from 'react-router-dom';
import PinochlePage from './cards/pinochle/PinochlePage';
import NotFoundPage from 'pages/notfound/NotFoundPage';
import './GamesPage.scss';

function GamesPage() {
    return (
        <Routes>
            {/* <Route index element={<div>Games</div>} /> */}
            <Route path="/pinochle/*" element={<PinochlePage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default GamesPage;