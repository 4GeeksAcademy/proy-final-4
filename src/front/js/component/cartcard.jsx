import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/cartcard.css';
import NoProductImg from "../../../../public/images/no-product-img.png";

const CartCard = ({ id, product_id, name, cost, image_url, units }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };

    const handleDelete = async () => {
        await actions.deleteFromCart(product_id);
    };

    return (
        <div className="card cart-card-container d-flex flex-column m-2 my-4">
            <button onClick={handleNavigate} className="card-main-btn">
                <div className="image-container">
                    <img src={image_url || NoProductImg} alt={name} className="card-img-top" />
                </div>
                <div className="card-body mx-auto">
                    <h5 className="card-title">{name || "Producto"}</h5>
                    <p className="card-text">${cost || "00"}.00</p>
                    <p className="card-text">Unidades: {units || "1"}</p>
                </div>
            </button>
            <button className="btn btn-danger mt-2" onClick={handleDelete}>Eliminar del carrito</button>
        </div>
    );
};

export default CartCard;
