import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/contactForm.css';

const ContactForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Nombre es requerido')
      .min(2, 'El nombre tiene que tener al menos 2 caracteres'),
    email: Yup.string()
      .email('Dirección de email inválida')
      .required('Email es requerido'),
    message: Yup.string()
      .required('Mensaje es requerido')
      .min(10, 'El Mensaje debe tener al menos 10 caracteres'),
  });

  return (
    <div className="contact-form-container">
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="contact-form">
            <div className="form-group">
              <label className="contact-label" htmlFor="name">Nombre</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label className="contact-label" htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label className="contact-label" htmlFor="message">Mensaje</label>
              <Field as="textarea" name="message" className="form-control" />
              <ErrorMessage name="message" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
