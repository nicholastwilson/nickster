import { Routes, Route } from 'react-router-dom';
import CardsPage from './pages/cards/CardsPage';
import './App.scss';

export default function App() {
  return (
    <Routes>
      <Route path="/cards" element={<CardsPage />} />
    </Routes>
  );
}