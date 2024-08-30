import React, { useState, useEffect } from "react";
import '../../styles/edithome.css';

const EditHome = () => {
    const [text, setText] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [selectedSection, setSelectedSection] = useState("");
    const maxChars = 5000;

    useEffect(() => {
        setCharCount(text.length);
    }, [text]);

    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= maxChars) {
            setText(inputText);
        }
    };

    const handleSectionChange = async (e) => {
        const section = e.target.value;
        setSelectedSection(section);

        // Realizar una solicitud GET para cargar el contenido de la sección seleccionada
        try {
            const response = await fetch(`URL_DEL_ENDPOINT/${section}`);
            if (response.ok) {
                const data = await response.json();
                setText(data.content); // Asumiendo que el contenido viene en un campo 'content'
            } else {
                console.error("Error al cargar los datos de la sección.");
            }
        } catch (error) {
            console.error("Error en la solicitud GET:", error);
        }
    };

    const handleSave = () => {
        // Lógica para guardar los cambios con un método PUT
        // Esta función se implementará en otro momento
        console.log("Guardar cambios:", text);
    };

    return (
        <div className="edit-home-container">
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Sección</label>
                <select className="form-select" id="inputGroupSelect01" defaultValue="" onChange={handleSectionChange}>
                    <option value="" disabled>Elige una sección...</option>
                    <option value="1">Nutrición</option>
                    <option value="2">Deportes</option>
                    <option value="3">Tips</option>
                </select>
            </div>

            <div className="editor-controls">
                <button className="format-btn" title="Mayúsculas"><i className="bi bi-alphabet-uppercase"></i></button>
                <button className="format-btn" title="Minúsculas"><i className="bi bi-alphabet"></i></button>
                <button className="format-btn" title="Negrita"><i className="fa-solid fa-bold"></i></button>
                <button className="format-btn" title="Cursiva"><i className="fa-solid fa-italic"></i></button>
                <button className="format-btn" title="Subrayado"><i className="fa-solid fa-underline"></i></button>
                <div className="format-btn dropdown">
                    <button className="dropdown-toggle" title="Alinear" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-align-left"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><button className="dropdown-item" title="Alinear a la Izquierda"><i className="fa-solid fa-align-left"></i> Izquierda</button></li>
                        <li><button className="dropdown-item" title="Alinear al Centro"><i className="fa-solid fa-align-center"></i> Centro</button></li>
                        <li><button className="dropdown-item" title="Alinear a la Derecha"><i className="fa-solid fa-align-right"></i> Derecha</button></li>
                    </ul>
                </div>
                <button className="format-btn" title="Lista Desordenada"><i className="fa-solid fa-list-ul"></i></button>
                <button className="format-btn" title="Lista Ordenada"><i className="fa-solid fa-list-ol"></i></button>
                <button className="format-btn" title="Agregar Enlace"><i className="fa-solid fa-link"></i></button>
            </div>

            <textarea
                className="editor-textarea"
                value={text}
                onChange={handleTextChange}
                placeholder="Escribe aquí..."
            ></textarea>
            <div className="word-count">
                {charCount}/{maxChars} caracteres
            </div>
            <button className="save-btn" onClick={handleSave}>Guardar Cambios</button>
        </div>
    );
};

export default EditHome;
