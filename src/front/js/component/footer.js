import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/footer.css";
import FooterBackGround from "../../../../public/images/footer_bg.jpg";
import NutriLogo from "../../../../public/images/nutri-logo-rounded.png";

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname !== "/login" && location.pathname !== "/register") {
        return (
            <footer className="footer mt-auto text-center w-100">
                <div className="footer-content">
                    <div className="footer-logo" onClick={() => navigate('/')}>
                        <img src={NutriLogo} alt="Logo" className="footer-logo-img" />
                    </div>
                    <div className="footer-links">
                        <div className="footer-link-item">
                            <div className="vertical-line"></div>
                            <span onClick={() => navigate('/about')}>Sobre Nosotros</span>
                        </div>
                        <div className="footer-link-item">
                            <div className="vertical-line"></div>
                            <span onClick={() => navigate('/contact')}>Contáctanos</span>
                        </div>
                        <div className="footer-link-item">
                            <div className="vertical-line"></div>
                            <span onClick={() => navigate('/social')}>Sociales</span>
                        </div>
                    </div>
                </div>
                <div className="footer-decor">
                    <img src={FooterBackGround} alt="Vegetables" />
                </div>
            </footer>
        );
    } else {
        return null;
    }
};

export default Footer;
