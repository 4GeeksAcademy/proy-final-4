import React, {useContext, useEffect} from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import '../../styles/professionals.css';
import ImgProN from "../../../../public/images/img-profesional-n.png";

const NutricionistCard = ({ id, name, description, calendly_name }) => {
    const {actions, store} = useContext(Context)

    let image_url = "";

    useEffect(() => {
        actions.getUserById(id);
    },[])
    
    return (
        <div className='prof-card-container n-card-container'>
            <div className='top-bg-effect'></div>
            <div className="image-container">
                <img src={image_url || ImgProN} className="card-img-top" />
            </div>
            <div className="card-body">
                <h4 className="card-title">{name || "Nombre"}</h4>
                <p className="card-text">{description || `Acerca de ${name}...`}</p>
            </div>
            <div className='card-footer'>
                <Link to={`professional/${id}`} className="more-link" >
                    <h5>
                        Ver perfil
                    </h5>
                </Link>
                <Link to={`/agenda/${calendly_name}`} className="more-link" >
                    <h5>
                        Ver agenda
                    </h5>
                </Link>
            </div>
        </div>
    )
}

export default NutricionistCard;