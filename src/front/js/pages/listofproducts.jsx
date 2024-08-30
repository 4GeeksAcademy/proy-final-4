import React, { useEffect, useState, useContext } from "react";
import ScrollToTopButton from "../component/ScrollToTopButton.jsx";
import { Context } from "../store/appContext";
import BannerProducts from "../../../../public/images/image_480.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../../styles/listofproducts.css";
import Product from "../component/product.jsx";

const ListOfProducts = () => {
    const { store, actions } = useContext(Context);
    const { products } = store;
    const [visibleProducts, setVisibleProducts] = useState(6);
    const [bannerLoaded, setBannerLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => {
        actions.getProducts();
    }, []);

    const loadMoreProducts = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 3);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortOrder) {
            case "low-to-high":
                return a.cost - b.cost;
            case "high-to-low":
                return b.cost - a.cost;
            case "a-z":
                return a.name.localeCompare(b.name);
            case "z-a":
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    const filteredProducts = sortedProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="list-of-products-container">
            <div className="invisible-header-box"></div>
            <div className="w-100 p-0 banner-container products-list-banner mb-4">
                <h1 className="banner-products-title">
                    Nuestros productos
                </h1>
                {!bannerLoaded && <Skeleton height={600} width="100%" />}
                <img
                    src={BannerProducts}
                    className="banner-img"
                    alt="banner-img"
                    onLoad={() => setBannerLoaded(true)}
                    style={{ display: bannerLoaded ? 'block' : 'none' }}
                />
            </div>

            <div className="search-container">
                <div>
                    <i className="bi bi-search"></i>
                    <h4>Filtrar</h4>
                </div>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="sort-container">
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="default">Ordenar</option>
                        <option value="low-to-high">Menor precio</option>
                        <option value="high-to-low">Mayor precio</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </div>
            </div>

            <div className="main-container">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, visibleProducts).map((product, index) => (
                        <Product
                            key={index}
                            id={product.id}
                            name={product.name}
                            cost={product.cost}
                            image_url={product.image_url}
                        />
                    ))
                ) : (
                    <h4 className="text-center text-danger m-4">No hay productos disponibles</h4>
                )}
            </div>

            {filteredProducts && visibleProducts < filteredProducts.length && (
                <div className="btn-container w-100 d-flex justify-content-center mt-5">
                    <button className="btn-see-more px-5 py-3 rounded" onClick={loadMoreProducts}>
                        Ver más
                    </button>
                </div>
            )}
            <ScrollToTopButton />
        </div>
    );
};

export default ListOfProducts;
