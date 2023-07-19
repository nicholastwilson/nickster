import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMobileScreen, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import './OrientationWarning.scss';

library.add(faMobileScreen, faRotateLeft);

function OrientationWarning() {
    return (
        <div className='ow-container'>
            <div className="ow-icon-container">
                <FontAwesomeIcon className='ow-mobile-icon' icon='fa-solid fa-mobile-screen' />
                <FontAwesomeIcon className='ow-rotate-icon' icon='fa-solid fa-rotate-left' />
            </div>
            <div className='ow-text'>Rotate your screen</div>
        </div>
    );
}

export default OrientationWarning;