import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import CartCard from "../component/cartcard.jsx";
import "../../styles/cart.css";
import { useNavigate } from "react-router-dom";
import { RotatingSquare } from 'react-loader-spinner'

const Cart = () => {
    const { store, actions } = useContext(Context);
    const { cart, totalAmount, isClearingCart } = store;
    const navigate = useNavigate();

    useEffect(() => {
        actions.getCartByUserId();
    }, []);

    const handleProceedToCheckout = () => {
        navigate("/checkout");
    };

    return (
        <>
            <div className="invisible-header-box" style={{ width: "50dvh" }}></div>
            <h1 className="text-center m-4">Carrito</h1>
            <div className="cart-container">
                <div className="main-container">
                    {isClearingCart ? (
                        <h4 className="text-center text-success m-5">
                            Vaciando carrito...
                            <RotatingSquare
                                visible={true}
                                height="100"
                                width="100"
                                color="#72BB53"
                                ariaLabel="rotating-square-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </h4>
                    ) : cart && cart.length > 0 ? (
                        cart.map((item) => (
                            <CartCard
                                key={item.id}
                                id={item.id}
                                product_id={item.product.id}
                                name={item.product.name}
                                cost={item.total_ammount}
                                image_url={item.product.image_url}
                                units={item.units}
                            />
                        ))
                    ) : (
                        <h4 className="text-center text-danger m-5">El carrito está vacío</h4>
                    )}
                </div>
                <div className="aside-container">
                    <div className="buttons-container">
                        <h5 className="total-amount">Total: ${totalAmount.toFixed(2)}</h5>
                        <button className="checkout-btn" onClick={handleProceedToCheckout} disabled={isClearingCart}>
                            Proceder al pago
                        </button>
                        <button className="clear-cart-btn" onClick={() => actions.clearCart()} disabled={isClearingCart}>
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
