import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import '../../styles/productdetail.css';
import ProductDetailCard from "../component/productCardDetail.jsx";
import Slider from "react-slick";
import Product from "../component/product.jsx";

const ProductDetail = () => {
    const { actions, store } = useContext(Context);
    const { product, products } = store;
    const { id } = useParams();

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
        speed: 1200,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 2800,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 533,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        actions.getProduct(id);
        actions.getProducts();
    }, [id]);

    return (
        <div className="product-detail-container">
            <div className="invisible-header-box"></div>
            <div className="first-container w-md-100 my-3 mt-5">
                <ProductDetailCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    cost={product.cost}
                    image_url={product.image_url}
                />
            </div>
            <div className="slider-container w-100 px-2 text-center">
                <h1 className="border-bottom pb-2 my-4">
                    Productos Relacionados
                </h1>
                <div className='products-carousel mb-5'>
                    <Slider {...settings}>
                        {products && products.length > 0 ? (
                            products.map((product, index) => (
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
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;