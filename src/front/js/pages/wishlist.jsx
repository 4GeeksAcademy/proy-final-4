import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import WishCard from "../component/wishCard.jsx"
import '../../styles/wishlist.css'

const WishList = () => {
    const { store, actions } = useContext(Context);
    const { favorites } = store;

    useEffect(() => {
        actions.getFavoritesByUserId();
    }, []);

    return (
        <>
            <div className="invisible-header-box" style={{ width: "50dvh" }} ></div>
            <h1 className="text-center m-4">Lista de deseos</h1>
            <div className="wishlist-container">
                <div className="main-container">
                    {favorites && favorites.length > 0 ? (
                        favorites.map((product, index) => (
                            <WishCard 
                                key={index}
                                id={product.fav_product.id}
                                name={product.fav_product.name}
                                cost={product.fav_product.cost}
                                image_url={product.fav_product.image_url}
                            />
                        ))
                    ) : (
                        <h4 className="text-center text-danger m-5">No hay Favoritos</h4>
                    )}
                </div>
                <div className="aside-container">
                    <div className="buttons-container">
                        <Link to="/products">
                            <button className="products-btn">
                                Explorar productos
                            </button>
                        </Link>
                        <Link to="/cart">
                            <button className="cart-btn">
                                Ir al carrito
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WishList;
