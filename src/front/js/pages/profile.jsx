import React, { useState, useContext, useEffect } from "react";
import "../../styles/CardProfile.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Swal from 'sweetalert2';




const ImgUpload = ({ onChange, src }) => (
  <div className="d-flex justify-content-center mb-3">
    <label htmlFor="photo-upload" className="custom-file-upload">
      <div className="img-wrap img-thumbnail rounded-circle small-img-wrap">
        <img alt="profile" src={src} className="img-fluid rounded-circle small-img" />
      </div>
      <input id="photo-upload" type="file" onChange={onChange} style={{ display: 'none' }} />
    </label>
  </div>
);

const Name = ({ onChange, value }) => (
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Nombre:</label>
    <input
      id="name"
      type="text"
      className="form-control"
      onChange={onChange}
      maxLength="25"
      value={value}
      placeholder="Ingrésa tu nuevo nombre"
    />
  </div>
);

const CalendlyUrl = () => (
  <div className="mb-3">
    <label htmlFor="url" className="form-label">Calendly url:</label>
    <input
      id="url"
      type="text"
      className="form-control"
      maxLength="150"
      placeholder="Ingrésa tu url de calendly"
  
    />
  </div>
);

const Description = () => (
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Descripción:</label>
    <textarea
      id="description"
      className="form-control"
      maxLength="2000"
      placeholder="Ingrésa tu descripción aquí"
    />
  </div>
);

const Password = ({ onChange, value }) => (
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Contraseña:</label>
    <input
      id="password"
      type="password"
      className="form-control"
      onChange={onChange}
      maxLength="25"
      value={value}
      placeholder="Ingrésa tu nueva contraseña"
      required
    />
  </div>
);

const Email = ({ onChange, value }) => (
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email:</label>
    <input
      id="email"
      type="email"
      className="form-control"
      onChange={onChange}
      value={value}
      placeholder="Ingrésa tu nuevo email"
      
    />
  </div>
);

const Edit = ({ onSubmit, children }) => (
  <div className="card p-4 my-5 edit-card">
    <form onSubmit={onSubmit}>
      <h1 className="card-title mb-4 text-center">Editar Perfil</h1>
      {children}
      <div className="text-center">
        <button type="submit" className="btn-profile save-button">
          Guardar
        </button>
      </div>
    </form>
  </div>
);

const CardProfile = () => {
  const { store, actions } = useContext(Context);
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {

    if (store.currentUser) {
      setName(store.currentUser.name || "");
      setEmail(store.currentUser.email || "");
    }
  }, [store.currentUser]);

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = store.currentUser?.id;
    const updatedUserData = {
      name,
      email,
      password,
    };

    const result = await actions.updateUser(userId, updatedUserData);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        text: '¡Tu perfil ha sido actualizado con éxito!',
      });
      navigate('/login');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar tu perfil. Por favor, intenta nuevamente.',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 main-background">
      <Edit onSubmit={handleSubmit}>
        <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
        <Name onChange={(e) => setName(e.target.value)} value={name} />
        <Email onChange={(e) => setEmail(e.target.value)} value={email} />
        <Password onChange={(e) => setPassword(e.target.value)} value={password} />
        <CalendlyUrl />
        <Description />
      </Edit>
    </div>
  );
};

export default CardProfile;
