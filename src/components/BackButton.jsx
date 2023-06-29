import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleLeft as farCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faCircleLeft as fasCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './BackButton.scss';

library.add(farCircleLeft, fasCircleLeft);

function BackButton({ clickHandler }) {
    return (
        <div className="bb-container" onClick={clickHandler}>
            <FontAwesomeIcon className="bb-icon-unfocused" icon="fa-regular fa-circle-left" />
            <FontAwesomeIcon className="bb-icon-focused" icon="fa-solid fa-circle-left" />
        </div>
    );
}

export default BackButton;