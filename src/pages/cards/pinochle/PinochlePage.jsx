import { Route, Routes } from 'react-router-dom';
import PinochleStartView from './PinochleStartView';
import PinochleGameView from './PinochleGameView';
import NotFoundPage from '../../NotFoundPage';
import './PinochlePage.scss';

function PinochlePage() {
    return (
        <Routes>
            {/* <Route index element={<div>Pinochle Page</div>} /> */}
            <Route path="/start" element={<PinochleStartView />} />
            <Route path="/game/:gameID" element={<PinochleGameView />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default PinochlePage;