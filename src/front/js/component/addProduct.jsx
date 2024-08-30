import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';


const AddProduct = () => {
  const { store, actions } = useContext(Context);
  const [file, setFile] = useState()
  const uploadImage = async (image) => {
    const data = new FormData()
    data.append('image', image)
    console.log(data)
    const response = await actions.uploadImage(data)
    if (response){
      const product = formik.values
      product.image_url = response.secure_url
      actions.addProduct(product)
    }else{
      alert("Hubo un error al agregar el producto")
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      cost: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
      cost: Yup.string()
        .required('Required'),
    }),
    onSubmit: values => {
      if (file){
        uploadImage(file)
        return
      }
      actions.addProduct(formik.values)
    },
  });
  return (
    <div className="add-product-container">
      <form onSubmit={formik.handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Producto</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-control"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="cost">Costo</label>
          <input
            id="cost"
            name="cost"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cost}
            className="form-control"
          />
          {formik.touched.cost && formik.errors.cost ? (
            <div className="error">{formik.errors.cost}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input
            className="form-control"
            name="image"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            id="image"
          />
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Subir
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;