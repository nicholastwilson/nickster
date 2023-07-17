import { Routes, Route } from 'react-router-dom';

import { UserPreferencesProvider } from './UserPreferencesContext';
import GamesView from './GamesView';
import PinochlePage from './cards/pinochle/PinochlePage';
import NotFoundPage from 'pages/notfound/NotFoundPage';

function GamesPage() {
    return (
        <UserPreferencesProvider>
            <Routes>
                <Route index element={<GamesView />} />
                <Route path="/pinochle/*" element={<PinochlePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </UserPreferencesProvider>
    );
}

export default GamesPage;