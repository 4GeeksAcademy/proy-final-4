import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/listofproducts.css";
import ImageProduct from "../../../../public/images/QUAKER® AVENA TRADICIONAL.png";

const Product = ({ id, name, cost }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product-detail/${id}`);
    };

    return (
        <div className="product-container  col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-75 d-flex flex-column justify-content-between " style={{background:'transparent',border:'none'}}>
                <button onClick={handleNavigate} className="btn p-0 w-100 h-100" style={{ background: "transparent", border: "none" }}>
                    <img src={ImageProduct} alt={name} className="card-img-top" />
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <h4 className="card-text">{cost}</h4>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Product;
