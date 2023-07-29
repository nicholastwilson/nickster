import { Route, Routes, Navigate } from 'react-router-dom';

import PinochleStartView from './PinochleStartView';
import PinochleGameView from './PinochleGameView';

function PinochlePage() {
    return (
        <Routes>
            <Route path='/start' element={<PinochleStartView />} />
            <Route path='/play/:gameID' element={<PinochleGameView />} />
            <Route path='*' element={<Navigate to='./start' replace />} />
        </Routes>
    );
}

export default PinochlePage;