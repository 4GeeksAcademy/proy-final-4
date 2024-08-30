import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/social.css';
import Logo from "../../../../public/images/nutri-logo-icon-b.png"
const Social = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    }
    return (
        <div className="social-page">
        <header className="social-header">
            <h1 className="header-title">Conéctate con Nosotros</h1>
        </header>
        
        <section className="social-links">
            <h2>Síguenos en Redes Sociales</h2>
            <ul className="d-flex justify-content-between">
                <div className="social-links-container">
                <li>
                    <a href="https://www.facebook.com/4geeksacademylatinoamerica/" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>
                </li>
                <li>
                    <a href="https://x.com/i/flow/login?redirect_after_login=%2F4geeksacademy" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/4geeksacademylatam/?hl=es" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                </li>
                </div>
                <div className="logo-container-social">
            <img src={Logo} className="logo-social-img" alt="nutri-4-well-logo" />
            </div>
            </ul>
            
        </section>

        <section className="testimonials">
            <h2>Testimonios</h2>
            <div className="testimonial">
                <p>"Este sitio me ha ayudado a mejorar mi salud de manera significativa. ¡Recomiendo sus servicios al 100%!"</p>
                <p>- Cliente Satisfecho</p>
            </div>
            <div className="testimonial">
                <p>"El equipo es muy profesional y sus recomendaciones son muy útiles. Gracias por todo."</p>
                <p>- Otro Cliente Satisfecho</p>
            </div>
        </section>
        
        <button className="go-home-button" onClick={handleGoHome}>
            Volver a Inicio
        </button>
        
        <footer className="social-footer">
            <p>&copy; 2024 Nutrición Saludable. Todos los derechos reservados.</p>
        </footer>
    </div>
);
}

export default Social;