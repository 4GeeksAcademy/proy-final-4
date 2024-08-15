import React from "react";
import Protein from "../../../../public/images/tarro-proteina.png"
import "../../styles/listofproducts.css"
const TopProduct = () => {
return (
    <div className="card-item d-flex flex-column align-items-center justify-content-center" >
  <img src={Protein} className="card-img-top protein align-self-end" alt="tarro-de-proteina"/>
  <div className="card-body-info-product" >
    <h5 className="card-title">Proteina</h5>
    <h6 className="card-subtitle text-center">44$</h6>

  </div>
</div>
)

}

export default TopProduct;