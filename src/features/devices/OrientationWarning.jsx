import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

import "./OrientationWarning.scss";

function OrientationWarning() {
    return (
        <div className="ow-container">
            <div className="ow-icon-container">
                <FontAwesomeIcon className="ow-mobile-icon" icon={faMobileScreen} />
                <FontAwesomeIcon className="ow-rotate-icon" icon={faRotateLeft} />
            </div>
            <div className="ow-text">Rotate your screen</div>
        </div>
    );
}

export default OrientationWarning;