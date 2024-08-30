import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/checkout.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CheckoutForm = () => {
    const { store, actions } = useContext(Context);
    const { totalAmount } = store;

    const formik = useFormik({
        initialValues: {
            Name: '',
            Address: '',
            email: '',
            city: '',
            postalCode: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            Name: Yup.string()
                .max(40, 'Debe tener 40 caracteres o menos')
                .required('Requerido'),
            Address: Yup.string()
                .max(40, 'Debe tener 40 caracteres o menos')
                .required('Requerido'),
            email: Yup.string().email('Correo electrónico no válido').required('Requerido'),
            city: Yup.string().required('Selecciona un departamento'),
            postalCode: Yup.string()
                .matches(/^[0-9]{5}$/, 'Debe ser un código postal válido de 5 dígitos')
                .required('Requerido'),
            phoneNumber: Yup.string()
                .matches(/^[0-9]{8,15}$/, 'Debe ser un número de teléfono válido de 8-15 dígitos')
                .required('Requerido'),
        }),
        onSubmit: async values => {
            // Aquí puedes hacer algo con los datos del formulario
            console.log('Datos de envío:', values);

            // Llama a la función de pago después de manejar los datos del formulario
            await actions.pagoMercadoPago(totalAmount);
            let url = store.mercadoPago.init_point;
            window.location.replace(url);
        },
    });

    return (
        <>
            <div className="invisible-header-box" style={{ width: "50dvh" }}></div>
            <h1 className="text-center m-4">Detalles de envío</h1>
            <div className="main-container">
                <form onSubmit={formik.handleSubmit} className="mx-auto w-50 signup-form-container">
                    <div className="form-group">
                        <label htmlFor="Name">Nombre</label>
                        <input
                            id="Name"
                            name="Name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Name}
                        />
                        {formik.touched.Name && formik.errors.Name ? (
                            <div className="error">{formik.errors.Name}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Address">Dirección</label>
                        <input
                            id="Address"
                            name="Address"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Address}
                        />
                        {formik.touched.Address && formik.errors.Address ? (
                            <div className="error">{formik.errors.Address}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Departamento</label>
                        <select
                            id="city"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                        >
                            <option value="" label="Selecciona un departamento" />
                            <option value="Artigas" label="Artigas" />
                            <option value="Canelones" label="Canelones" />
                            <option value="Cerro Largo" label="Cerro Largo" />
                            <option value="Colonia" label="Colonia" />
                            <option value="Durazno" label="Durazno" />
                            <option value="Flores" label="Flores" />
                            <option value="Florida" label="Florida" />
                            <option value="Lavalleja" label="Lavalleja" />
                            <option value="Maldonado" label="Maldonado" />
                            <option value="Montevideo" label="Montevideo" />
                            <option value="Paysandú" label="Paysandú" />
                            <option value="Río Negro" label="Río Negro" />
                            <option value="Rivera" label="Rivera" />
                            <option value="Rocha" label="Rocha" />
                            <option value="Salto" label="Salto" />
                            <option value="San José" label="San José" />
                            <option value="Soriano" label="Soriano" />
                            <option value="Tacuarembó" label="Tacuarembó" />
                            <option value="Treinta y Tres" label="Treinta y Tres" />
                        </select>
                        {formik.touched.city && formik.errors.city ? (
                            <div className="error">{formik.errors.city}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode">Código Postal</label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.postalCode}
                        />
                        {formik.touched.postalCode && formik.errors.postalCode ? (
                            <div className="error">{formik.errors.postalCode}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Número de Teléfono</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                            <div className="error">{formik.errors.phoneNumber}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <button className="btn btn-success mb-3 p-2 w-100" type="submit">Pagar ${totalAmount.toFixed(2)}</button>
                </form>
            </div>
        </>
    );
};

export default CheckoutForm;
