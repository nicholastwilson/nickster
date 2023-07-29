import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as NicksterLogo } from 'assets/images/app/nickster_logo.svg';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './NotFoundPage.scss';

function NotFoundPage() {
    const navigate = useNavigate();
    const [rotation, setRotation] = useState((Date.now() * 0.03333) % 360);
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((Date.now() * 0.03333) % 360);
        }, 16);  // ~60fps
        return () => clearInterval(interval);
    })
    return (
        <div className='nf-container'>
            <div className='nf-logo-container'>
                <NicksterLogo className='nf-logo' style={{ rotate: `${rotation}deg` }} />
                <h1 className='nf-text'>Page Not Found</h1>
            </div>
            <div className='nf-buttons-container'>
                <button className='nf-button' onClick={() => navigate(-1, { replace: true })}>
                    <FontAwesomeIcon className='nf-icon' icon={faCircleArrowLeft} />
                    Back
                </button>
            </div>
        </div>
    );
}

export default NotFoundPage;