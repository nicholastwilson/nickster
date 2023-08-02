import { Route, Routes, Navigate } from "react-router-dom";

import AuthRoute from "features/auth/AuthRoute";
import PinochleStartView from "./PinochleStartView";
import PinochleGameView from "./PinochleGameView";

function PinochlePage() {
    return (
        <Routes>
            <Route path="/start" element={<PinochleStartView />} />
            <Route path="/play/:gameID" element={
                <AuthRoute>
                    <PinochleGameView />
                </AuthRoute>
            } />
            <Route path="*" element={<Navigate to="./start" replace />} />
        </Routes>
    );
}

export default PinochlePage;