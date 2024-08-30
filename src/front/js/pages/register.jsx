import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import Logo from "../../../../public/images/nutri-logo-icon-b.png";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="login-body d-flex justify-content-center align-items-center">
            <div className="bg-light rounded col-12 col-lg-6 container container-login">
                <div className="header-container container-header-register my-5 d-flex align-items-center justify-content-between">
                    <div className="logo-img-container d-flex">
                        <img className="logo-img" src={Logo} alt="logo-nutri-4-well" />
                    </div>
                    <h1 className="text-center header-login-title">
                        Registrarse
                    </h1>
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        password2: '',
                        address: '',
                        phone: ''
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .matches(/^[a-zA-Z\s]*$/, 'Solo se permiten letras y espacios')
                            .required('Requerido'),
                        email: Yup.string().email('Ingresa un correo válido').required('Requerido'),
                        password: Yup.string()
                            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                            'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial')
                            .required('Contraseña inválida'),
                        password2: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                            .required('Las contraseñas deben coincidir'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (values.password !== values.password2) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error en el registro',
                                text: 'Las contraseñas no coinciden. Por favor, verifica e inténtalo nuevamente.'
                            });
                            setSubmitting(false);
                            return;
                        }

                        let resp = await actions.register(values.name, values.email, values.password, values.address, values.phone);
                        if (resp) {
                            await actions.login(values.email, values.password);
                            Swal.fire({
                                icon: 'success',
                                title: '¡Registro exitoso!',
                                text: 'Bienvenid@, tu cuenta ha sido creada correctamente.'
                            }).then(() => {
                                navigate('/');
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error en el registro',
                                text: 'Por favor, revisa los datos ingresados e intenta nuevamente.'
                            });
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ handleSubmit }) => (
                        <Form className="row g-3 d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
                            <div className="col-auto w-75 error-message">
                                <Field name="name" type="text" className="form-control" id="inputName2" placeholder="Nombre Completo" />
                                <ErrorMessage name="name" />
                            </div>
                            <div className="col-auto w-75 error-message">
                                <Field name="email" type="email" className="form-control" placeholder="Correo electrónico" />
                                <ErrorMessage name="email" />
                            </div>
                            <div className="col-auto w-75 error-message">
                                <Field name="password" type="password" className="form-control" placeholder="Contraseña" />
                                <ErrorMessage name="password" />
                            </div>
                            <div className="col-auto w-75 error-message">
                                <Field name="password2" type="password" className="form-control" placeholder="Repetir Contraseña" />
                                <ErrorMessage name="password2" />
                            </div>
                            <div className="col-auto w-75">
                                <Field name="address" type="text" className="form-control" placeholder="Dirección" />
                            </div>
                            <div className="col-auto w-75">
                                <Field name="phone" type="number" className="form-control" placeholder="Teléfono" />
                            </div>
                            <div className="register-link-container d-flex justify-content-center">
                                <Link className="register-link" to='/login'>¿Ya tienes una cuenta? Inicia sesión</Link>
                            </div>
                            <div className="col-auto d-flex justify-content-center w-100">
                                <button type="submit" className="btn btn-login mb-3 p-2 w-75">Registrarse</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Register;
