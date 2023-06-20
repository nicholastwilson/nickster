import { Routes, Route } from 'react-router-dom';
import PinochlePage from './pinochle/PinochlePage';

export default function CardsPage() {
    return (
        <Routes>
            <Route path="pinochle/:game_id" component={<PinochlePage />} />
        </Routes>
    );
}