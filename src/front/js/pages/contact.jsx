import React from 'react';
import ContactForm from '../component/contactForm.jsx';
import  "../../styles/contactForm.css"
import Logo from "../../../../public/images/nutri-logo-icon-b.png"
const Contact = () => {
    return (
        <div className="container mt-5">
         
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                <div className="invisible-header-box"></div>
                <div className="header-contact-container d-flex flex-column justify-content-center">
                    <h1 className='text-center mb-4 contact-title'> Contáctanos</h1>
                    <div className="logo-image-container d-flex justify-content-center">
                    <img src={Logo} alt="logo-nutri4well" className='logo-nutri' />
                    </div>
                    <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
