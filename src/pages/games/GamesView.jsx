import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as NicksterLogo } from 'assets/nickster_logo.svg';
import BackButton from 'components/BackButton';
import './GamesView.scss';


export default function GamesView() {
    return (
        <div className="games-page">
            <NicksterLogo className="games-logo" />
            <div className="games-title">Nickster</div>
            <div className="games-subtitle">Games</div>
        </div>
    );
}