import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../styles/professionaldetail.css';
import ProfessionalDetailCard from "../component/professionalDetailCard.jsx";

const ProfessionalDetail = () => {
    const { actions, store } = useContext(Context);
    const { user } = store;
    const { id } = useParams();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/professionals`);
    };

    useEffect(() => {
        actions.getUserById(id);

    }, []);
    console.log(id);
    

    return (
        <div className="professional-detail-container">
            <div className="invisible-header-box"></div>
            <button className="prof-det-btn m-3" onClick={handleNavigate}>
                <i className="bi bi-arrow-bar-left"></i>
                Regresar
            </button>
            <div className="first-container w-md-100 mb-3">
                <ProfessionalDetailCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    description={user.description}
                    // calendly_url={user.calendly_url}
                    calendly_name={user.calendly_name}
                />
                {/* <a href={calendlyLink} target="_blank" rel="noopener noreferrer">Agenda una consulta</a> */}
            </div>
        </div>
    )
}

export default ProfessionalDetail;