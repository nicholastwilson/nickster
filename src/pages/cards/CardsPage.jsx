import { Routes, Route } from 'react-router-dom';
import PinochlePage from './pinochle/PinochlePage';
import NotFoundPage from '../NotFoundPage';

function CardsPage() {
    return (
        <Routes>
            {/* <Route index element={<div>Cards Page</div>} /> */}
            <Route path="/pinochle/*" element={<PinochlePage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default CardsPage;