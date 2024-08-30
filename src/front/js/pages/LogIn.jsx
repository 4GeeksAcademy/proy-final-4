import React, {useContext}from "react";
import{Context} from "../store/appContext"
import "../../styles/login.css";
import Logo from "../../../../public/images/nutri-logo-icon-b.png";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
const LogIn = () => {
    const{actions} = useContext(Context);
    const navigate = useNavigate();
    return (
        <div className="login-body d-flex justify-content-center align-items-center">
            <div className="h-75 bg-light rounded col-12 col-lg-6 container container-login">
                <div className="header-container mt-5 h-25 d-flex align-items-center justify-content-between">
                    <div className="logo-img-container d-flex">
                        <img className="logo-img" src={Logo} alt="logo-nutri-4-well" />
                    </div>
                    <h1 className="text-center header-login-title">
                        Inicio de sesión
                    </h1>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        
                        email: Yup.string().email('Ingresa un correo válido').required('Ingresa un correo válido'),
                        password: Yup.string().required('Contraseña inválida'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        let resp = await actions.login(values.email,values.password);
                        if (resp) {
                            await actions.login(values.email, values.password);
                            Swal.fire({
                                icon: 'success',
                                title: '¡Sesión iniciada!',
                                text: 'Bienvenid@'
                            }).then(() => {
                                navigate('/');
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error en el inicio',
                                text: 'Por favor, revisa los datos ingresados e intenta nuevamente.'
                            });
                        }
                        setSubmitting(false);
                    
                    }}
                >

                    <Form className="row g-3 d-flex flex-column justify-content-center align-items-center">
                        <div className="col-auto w-75 error-message">
                            <Field name="email" type="email" className="form-control" id="exampleFormControlInput1" placeholder="Correo electrónico" />
                            <ErrorMessage name="email"/>
                        </div>
                        <div className="col-auto w-75 error-message">
                            <Field name="password" type="password" className="form-control" id="inputPassword2" placeholder="Contraseña" />
                            <ErrorMessage name="password"/>
                        </div>
                        <div className="register-link-container d-flex justify-content-center">
                            <Link className="register-link" to='/register'>Registrarse</Link>
                        </div>
                        <div className="col-auto d-flex justify-content-center w-75">
                            <button type="submit" className="btn btn-login mb-3 p-2 w-100">Iniciar sesión</button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </div>
    );

}



export default LogIn;
