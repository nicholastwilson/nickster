import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft as farCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faCircleLeft as fasCircleLeft } from '@fortawesome/free-solid-svg-icons';

import './BackButton.scss';

function BackButton({ clickHandler }) {
    return (
        <div className='bb-container' onClick={clickHandler}>
            <FontAwesomeIcon className='bb-icon-unfocused' icon={farCircleLeft} />
            <FontAwesomeIcon className='bb-icon-focused' icon={fasCircleLeft} />
        </div>
    );
}

export default BackButton;