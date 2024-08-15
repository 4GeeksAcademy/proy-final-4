import React from "react";
import '../../styles/productdetail.css';
import ImgA from '../../../../public/images/cereal.png'
import ImageGallery from "react-image-gallery";

const images = [
    {
        original: "https://quaker.lat/cl/sites/cl/files/2023-07/QUAKER%C2%AE%20AVENA%20TRADICIONAL.png",
        thumbnail: "https://quaker.lat/cl/sites/cl/files/2023-07/QUAKER%C2%AE%20AVENA%20TRADICIONAL.png",
    },
    {
        original: "https://images.lider.cl/wmtcl?source=url%5Bfile%3A%2Fproductos%2F296899d.jpg%5D&scale=size%5B450x450%5D&sink=format%5Bwebp%5D",
        thumbnail: "https://images.lider.cl/wmtcl?source=url%5Bfile%3A%2Fproductos%2F296899d.jpg%5D&scale=size%5B450x450%5D&sink=format%5Bwebp%5D",
    }
];


const ProductDetail = () => {
    return (
        <div className="product-detail-container">
            <div className="invisible-header-box"></div>
            <div className="first-container w-md-100">
                <div className="images-container">
                    <ImageGallery items={images}
                        showPlayButton={false}
                        thumbnailPosition="top"
                    />
                </div>
                <div className="detail-container">
                    <button className="heart-container">
                        <i className="bi bi-suit-heart-fill"></i>
                    </button>
                    <button className="cart-container">
                        <i className="bi bi-cart4"></i>
                    </button>
                    <div className="data-container">
                        <div className="add-container p-2 m-2">
                            <h3>Avena QUAKER Tradicional</h3>
                            <h4>$144.00</h4>
                        </div>
                        <div className="add-container p-2 m-2 mt-4">
                            <h4 className="col">Stock Disponible</h4>
                            <p className="col">10 Unidades</p>
                        </div>
                        <button className="buy-btn">Comprar</button>

                        {/* <button className="add-cart-btn">Agregar al carrito</button> */}
                    </div>
                </div>
            </div>
            <h1 className="border-bottom mt-4 mb-2">
                Productos Relacionados
            </h1>
            <div className="products-container w-100 mb-5 mx-auto">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="3000">
                            <button className="w-75 mx-auto d-flex align-center justify-content-center border-0 bg-transparent">
                                <img src={ImgA} className="bg-success d-block w-75" alt="..." loading="lazy" />
                            </button>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Prod 1</h5>
                                <p>$20.00</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <button className="w-75 mx-auto d-flex align-center justify-content-center border-0 bg-transparent">
                                <img src={ImgA} className="bg-danger d-block w-75" alt="..." loading="lazy" />
                            </button>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Prod 2</h5>
                                <p>$20.00</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <button className="w-75 mx-auto d-flex align-center justify-content-center border-0 bg-transparent">
                                <img src={ImgA} className="bg-warning d-block w-75" alt="..." loading="lazy" />
                            </button>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Prod 1</h5>
                                <p>$20.00</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;