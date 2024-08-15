import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import BannerProducts from "../../../../public/images/image_480.png";
import "../../styles/listofproducts.css";
import TopProduct from '../component/topproduct.jsx';
import Product from "../component/product.jsx";

const ListOfProducts = () => {
    const { store, actions } = useContext(Context);
    const {products} = store;

    useEffect(() => {
        // const fetchProducts = async () => {

        actions.getProducts();

    }, []);

    return (
        <div className="w-100 m-0 p-0 list-of-products-container">
            <div className="banner-container w-100 d-flex">
                <div className="container-banner-title align-items-center">
                    <h1 className="banner-products-title">
                        Nuestros productos
                    </h1>
                </div>
                <img src={BannerProducts} className="banner-img mb-5" alt="banner-img" />
            </div>


            <div className="container-background align-items-center justify-content-center d-flex mt-5">
                <div className="container background">
                    <div className="row d-flex container-top-products">
                        <div className="col-md-4 col-xs-12 container-top-product">
                            <TopProduct />
                        </div>
                        <div className="col-md-4 col-xs-12 container-top-product">
                            <TopProduct />
                        </div>
                        <div className="col-md-4 col-xs-12 container-top-product">
                            <TopProduct />
                        </div>
                    </div>
                </div>
            </div>


            <div className="container background mt-5">
                <div className="row d-flex container-top-products dynamic-products ">



                    {store.products && store.products.length > 0 &&
                        store.products.map((product, index) => (

                            <Product className="col-md-4 col-xs-12"
                            
                                key={index}
                                id={product.id}
                            // img={product.image}
                                name={product.name}
                                cost={product.cost}
                            />

                        ))}
                </div>
            </div>

            {/* <div className="btn-container w-100 d-flex justify-content-center">
                <button className="btn-see-more px-5 py-3 mt-3 rounded">
                    Ver más
                </button>
            </div> */}
        </div>
    );
};

export default ListOfProducts;