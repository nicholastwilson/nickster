import { useNavigate } from "react-router-dom";
import './NotFoundPage.scss';
import { NicksterLogoSVG, HomeSVG, BackSVG } from '../assets/index.js';

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="logo-container">
                <img src={NicksterLogoSVG} alt="Logo" className="logo" />
                <h1 className="text">Page Not Found</h1>
            </div>
            <div className="buttons-container">
                <button className="button" onClick={() => navigate("/")}>
                    <img src={HomeSVG} alt="Home" className="icon" />
                    Home
                </button>
                <button className="button" onClick={() => navigate(-1)}>
                    <img src={BackSVG} alt="Back" className="icon" />
                    Back
                </button>
            </div>
        </div>
    );
}

export default NotFoundPage;