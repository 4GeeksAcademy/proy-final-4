import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import '../../styles/paycallback.css';

const PayCallback = () => {
    const { actions, store } = useContext(Context);
    const { cart, isClearingCart } = store;
    const { status } = useParams();
    const navigate = useNavigate();

    const handleHome = () => {
        actions.clearCart()
        navigate("/");
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let params = {}
        for (const [key, value] of urlParams) {
            params[key] = value
        }

        actions.getCartByUserId();


        if (status == "success") {
            alert('Pago exitoso')
        } else if (status == "failure") {
            alert('Pago fallido')
        } else if (status == "pending") {
            alert('Pago pendiente')
        }
    }, [status]);

    return (
        <div className="product-detail-container">
            <div className="invisible-header-box"></div>
            {status == "success" ? (<h1 className="m-2">Pago exitoso</h1>) : ("")}
            {status == "failure" ? (<h1 className="m-2">Pago fallido</h1>) : ("")}
            {status == "pending" ? (<h1 className="m-2">Pago pendiente</h1>) : ("")}
            <button className="btn btn-success m-3 p-2" onClick={handleHome} disabled={isClearingCart}>
                Regresar al Inicio
            </button>
        </div>
    );
};

export default PayCallback;