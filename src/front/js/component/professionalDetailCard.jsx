import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/professionaldetail.css";
import ImgProN from "../../../../public/images/img-profesional-n.png";

const ProfessionalDetailCard = ({ id, name, description, calendly_name }) => {
    const { actions, store } = useContext(Context);

    let image_url = "https://raw.githubusercontent.com/OlgaKoplik/CodePen/master/profile.jpg";

    return (
        <>
            <div className="image-container">
                <img src={image_url || ImgProN} className="card-img-top" />
            </div>
            <div>
                <h1 className="m-5">{name}</h1>
                <p>{description}</p>
                <Link to={`/agenda/${calendly_name}`} className="more-link" >
                    <h5>
                       {`Agendarme con ${name}`}
                    </h5>
                </Link>
            </div>
        </>
    )
}
export default ProfessionalDetailCard;