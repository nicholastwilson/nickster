import { ReactComponent as NicksterLogo } from 'assets/nickster_logo.svg';
import PlayingCard from './cards/PlayingCard';
import './GamesView.scss';

export default function GamesView() {
    return (
        <div className="games-page">
            <NicksterLogo className="games-logo" />
            <div className="games-title">Nickster</div>
            <div className="games-subtitle">Games</div>
            <div className="game-buttons-container">
                <div className="pinochle-button">
                    <div className="game-button">
                        <div className="card-jack"><PlayingCard suit="Diamonds" rank="Jack" /></div>
                        <div className="card-queen"><PlayingCard suit="Spades" rank="Queen" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}