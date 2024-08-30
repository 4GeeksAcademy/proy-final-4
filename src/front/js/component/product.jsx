import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/listofproducts.css";
import NoProductImg from "../../../../public/images/no-product-img.png";
import "../../styles/index.css";

const Product = ({ id, name, cost, image_url }) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const isFavorite = () => {
        return store.favorites.some(favorite => favorite.fav_product.id === id);
    };

    const isInCart = () => {
        return store.cart.some(cartItem => cartItem.product_id === id);
    };

    const toggleFavorite = async () => {
        if (isFavorite()) {
            const favorite = store.favorites.find(fav => fav.fav_product.id === id);
            await actions.deleteFavorite(favorite.id);
        } else {
            await actions.addFavorite(id);
        }
    };

    const toggleCart = async () => {
        if (isInCart()) {
            await actions.deleteFromCart(id);
        } else {
            const totalAmount = cost * 1;
            await actions.addToCart(id, 1, totalAmount);
        }
    };

    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="card product-card-container d-flex flex-column m-3">
            <button className={`heart-container ${isFavorite() ? "favorite-on" : ""}`} onClick={toggleFavorite}>
                <i className="bi bi-suit-heart-fill"></i>
            </button>
            <button className={`cart-icon-container ${isInCart() ? "cart-on" : ""}`} onClick={toggleCart}>
                <i className="bi bi-cart4"></i>
            </button>
            <button onClick={handleNavigate} className="h-100 card-link-button">
                <div className="image-container">
                    <img src={image_url || NoProductImg} alt={name} className="card-img-top" />
                </div>
                <div className="card-body mt-auto">
                    <h5 className="card-title">{name || "Ejemplo"}</h5>
                    <p className="card-text">${cost || "00"}.00</p>
                </div>
            </button>
        </div>
    );
};

export default Product;
