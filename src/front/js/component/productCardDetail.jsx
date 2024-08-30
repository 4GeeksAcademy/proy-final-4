import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/listofproducts.css";
import NoProductImg from "../../../../public/images/no-product-img.png";
import Slider from "react-slick";

const ProductDetailCard = ({ id, name, cost, image_url }) => {
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);

    const isFavorite = () => {
        return store.favorites.some(favorite => favorite.fav_product.id === id);
    };

    const isInCart = () => {
        return store.cart.some(cartItem => cartItem.product_id === id);
        // console.log(store.cart.some(cartItem => cartItem.product_id === id));
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
        navigate(`/cart/users/1`);
    };

    const allInOne = async () => {
        toggleCart();
        handleNavigate();
    }

    // CARRUSEL_____________________________________
    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            />
        );
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div
                style={{
                    backgroundColor: "transparent",
                }}
            >
                <ul style={{ margin: "0px 4px" }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "30px",
                    padding: "2px",
                    color: "#394B3F",
                    border: "1px solid #394B3F",
                    borderRadius: "50%",
                }}
            >
                {i + 1}
            </div>
        ),
    };

    return (
        <>
            <div className="images-container">
                <img src={image_url || NoProductImg} alt={name} />
            </div>
            <div className="detail-container">
                <button className={`heart-container ${isFavorite() ? "favorite-on" : ""}`} onClick={toggleFavorite} >
                    <i className="bi bi-suit-heart-fill"></i>
                </button>
                <button className={`cart-icon-container ${isInCart() ? "cart-on" : ""}`} onClick={toggleCart} >
                    <i className="bi bi-cart4"></i>
                </button>
                <div className="data-container">
                    <div className="add-container p-2 m-2">
                        <h3>{name || "Ejemplo"}</h3>
                        <h4>${cost || "00"}.00</h4>
                    </div>
                    <div className="add-container p-2 m-2 mt-4">
                        <h4 className="col">Stock Disponible</h4>
                        <p className="col">10 Unidades</p>
                    </div>
                    <button className="buy-btn mb-1" onClick={allInOne}>Comprar</button>
                </div>
            </div>
        </>
    );
};

export default ProductDetailCard;