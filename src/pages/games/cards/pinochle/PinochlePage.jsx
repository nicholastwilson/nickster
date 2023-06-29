import { Route, Routes } from 'react-router-dom';
import PinochleStartView from './PinochleStartView';
import PinochleGameView from './PinochleGameView';
import NotFoundPage from 'pages/notfound/NotFoundPage';
import './PinochlePage.scss';

function PinochlePage() {
    return (
        <Routes>
            <Route path="/start" element={<PinochleStartView />} />
            <Route path="/play/:gameID" element={<PinochleGameView />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default PinochlePage;