import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/wishcard.css'
import Product from "./product.jsx";

import NoProductImg from "../../../../public/images/no-product-img.png";

const WishCard = ({ id, name, cost, image_url }) => {
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
        <div className="card wish-card-container d-flex flex-column m-2 my-4">
            <button className='card-btn top-btn' onClick={toggleFavorite}>
                <h6>
                    Eliminar de favoritos
                </h6>
            </button>
            <button onClick={handleNavigate} className="card-main-btn" >
                <div className="image-container">
                    <img src={image_url || NoProductImg} alt={name} className="card-img-top" />
                </div>
                <div className="card-body mx-auto">
                    <h5 className="card-title">{name || "Ejemplo"}</h5>
                    <p className="card-text">${cost || "00"}.00</p>
                </div>
            </button>
            <button className={`card-btn bottom-btn ${isInCart() ? "wish-cart-on" : ""}`} onClick={toggleCart}>
                <h6>
                    Agregar al carrito
                </h6>
            </button>
        </div>
    );
}

export default WishCard;