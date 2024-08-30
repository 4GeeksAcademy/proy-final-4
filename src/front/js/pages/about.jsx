import React from "react";
import '../../styles/about.css'; 


const About = () => {
    return (
        <div className="about-container container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1 className="mb-4">Sobre Nosotros</h1>
                    <p className="lead">
                    ¡Bienvenido a nuestro sitio! Nos dedicamos a facilitar el acceso a nutricionistas,
                     personal trainers y productos saludables, todo al alcance de tu mano. Nuestra misión es hacer que llevar una vida saludable sea más accesible 
                     y conveniente para todos. Ya sea que busques orientación nutricional, un plan de ejercicios personalizado, o productos que apoyen tu bienestar
                    , estamos aquí para ayudarte a alcanzar tus metas y vivir de manera más plena y saludable.
                    </p>
                </div>
                
            </div>
        <div className="container-nutri-personal d-flex -justify-content-around">
            <div className="nutrition mt-3 me-3">
                
                <p className="nutrition-text"><h3 className="nutrition-title">Nutrición</h3> La nutrición es clave para mantener una vida saludable y equilibrada.
                     Una dieta adecuada, rica en frutas, verduras, proteínas, y granos enteros, proporciona al cuerpo los nutrientes esenciales para funcionar de manera óptima.
                      Además, una buena nutrición ayuda a prevenir enfermedades, mejora el estado de ánimo y aumenta la energía. 
                      Entender y adoptar hábitos alimenticios saludables es fundamental para alcanzar 
                    el bienestar general y vivir de manera plena y activa. ¡Cuida lo que comes y cuida tu salud!</p>
            </div>
            <div className="personal-trainer mt-3">

                <p className="personal-trainer-text"><h3 className="personal-trainer-title">Entrenador personal</h3> Los entrenadores personales son profesionales dedicados a ayudarte a alcanzar tus metas de fitness de manera efectiva y segura. Con su conocimiento experto, 
                    diseñan rutinas de ejercicio personalizadas, adaptadas a tus necesidades y objetivos específicos. Además de guiarte en la técnica correcta, un entrenador personal te motiva y apoya en cada paso,
                     asegurando que aproveches al máximo cada sesión. Trabajar con un entrenador personal es una inversión en tu salud y bienestar, 
                    que te acerca a una vida más activa y saludable.</p>
            </div>
        </div>
        </div>
    );
};

export default About;