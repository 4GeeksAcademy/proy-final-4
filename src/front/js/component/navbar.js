import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import nutriLogo from "../../../../public/images/nutri-logo-icon-b.png";
import "../../styles/navbar.css";

export const Navbar = () => {
    let location = useLocation();
    const { actions, store } = useContext(Context);
    let id = 0;
    if (location.pathname !== "/login" && location.pathname !== "/register") {
        return (
            <>
                <nav className="navbar-container navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <div className="container-fluid">
                        <Link to="/">
                            <div className="logo-container">
                                <img src={nutriLogo} alt="Nutri4Well Logo" />
                                <span translate="no">Nutri4Well</span>
                            </div>
                        </Link>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="bi bi-list"></i>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {store.auth ? (
                                <ul className="navbar-nav ms-auto mb-lg-0 text-lg-end">
                                    <li className="nav-item my-lg-auto nav-text-item">
                                        <Link to="/professionals" className="link">
                                            <button type="button nav-text-btn">
                                                <i className="bi bi-lungs"></i>
                                                <span className="i-name">Profesionales</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item my-lg-auto nav-text-item">
                                        <Link to="/products" className="link">
                                            <button type="button nav-text-btn">
                                                <i className="bi bi-basket2"></i>
                                                <span className="i-name">Productos</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/wishlist/users/1" className="link">
                                            <button type="button nav-text-btn">
                                                <i className="bi bi-suit-heart-fill"></i>
                                                <span className="i-name">Favoritos</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/cart/users/1" className="link">
                                            <button type="button">
                                                <i className="bi bi-cart4"></i>
                                                <span className="i-name">Carrito</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown user-list">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <button type="button">
                                                <i className="bi bi-person"></i>
                                                <span className="i-name">Usuario</span>
                                            </button>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-user-menu" aria-labelledby="navbarDropdown">
                                            <Link to={`/user/${id}`} className="link">
                                                <li><button type="button">Perfil</button></li>
                                            </Link>
                                            <Link to="/login" className="link">
                                                <li><button type="button" onClick={() => actions.logout()}>Cerrar Sesión</button></li>
                                            </Link>
                                        </ul>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="navbar-nav ms-auto links-container">
                                    <li className="nav-item">
                                        <Link className="home-to-register mx-5 text-md-center" to="register">Registrarme</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="home-to-login mx-5 text-md-center" to="login">Iniciar sesión</Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>
            </>
        );
    } else {
        return null;
    }
};
