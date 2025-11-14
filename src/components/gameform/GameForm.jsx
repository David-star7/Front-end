import React, { useState } from 'react';

import './GameForm.css'; 

const GameForm = () => {
   
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        releaseDate: '',
        coverUrl: '',
        description: ''
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

   
    const handleSubmit = (e) => {
        e.preventDefault();
        
  
        console.log('Datos del formulario listos para enviar al Backend:', formData);
        

        setFormData({ title: '', genre: '', releaseDate: '', coverUrl: '', description: '' });
    };

    return (
       
        <form className="form-container" onSubmit={handleSubmit}>
            
            <h2 className="form-title">Agregar Nuevo Juego</h2>

          
            <div className="form-group">
                <label htmlFor="title">Título del Videojuego:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            
            <div className="form-group">
                <label htmlFor="genre">Género:</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                />
            </div>

           
            <div className="form-group">
                <label htmlFor="releaseDate">Fecha de Lanzamiento:</label>
                <input
                    type="text"
                    id="releaseDate"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                />
            </div>

            <div className="form-group">
                <label htmlFor="coverUrl">URL de la Portada (Imagen):</label>
                <input
                    type="url"
                    id="coverUrl"
                    name="coverUrl"
                    value={formData.coverUrl}
                    onChange={handleChange}
                />
            </div>
            
           
            <div className="form-group">
                <label htmlFor="description">Descripción / Notas:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>

          
            <button type="submit">Guardar Juego</button>
            
        </form>
    );
};

export default GameForm;