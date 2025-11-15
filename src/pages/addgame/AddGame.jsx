
import { useState } from "react";
import { createGame } from "../../services/gameService";
import "./AddGame.css";

function AddGame() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    añoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createGame(form);

      // Mostrar modal de éxito con mensaje personalizado
      setModalMessage(`🎮 ¡"${form.titulo}" agregado correctamente!`);
      setModalOpen(true);

      // Limpiar formulario
      setForm({
        titulo: "",
        genero: "",
        plataforma: "",
        añoLanzamiento: "",
        desarrollador: "",
        imagenPortada: "",
        descripcion: "",
        completado: false,
      });

    } catch (error) {
      // Mostrar modal de error
      setModalMessage("❌ Error al agregar el juego");
      setModalOpen(true);
    }
  };

  return (
    <>
      {/* MODAL EMERGENTE MEJORADO */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal success-modal">
            <div className="modal-icon">🎮</div>
            <h3>¡Éxito!</h3>
            <p>{modalMessage}</p>
            <button 
              className="btn-accept"
              onClick={() => setModalOpen(false)}
            >
              ACEPTAR
            </button>
          </div>
        </div>
      )}

      <div className="addgame-container">
        <div className="addgame-card">
          <h2>🎮 Agregar Nuevo Juego</h2>

          <form onSubmit={handleSubmit} className="addgame-form">

            <div className="form-group">
              <label>Título del juego</label>
              <input
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Género</label>
              <input
                type="text"
                name="genero"
                value={form.genero}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Plataforma</label>
              <input
                type="text"
                name="plataforma"
                value={form.plataforma}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Año de lanzamiento</label>
              <input
                type="number"
                name="añoLanzamiento"
                value={form.añoLanzamiento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Desarrollador</label>
              <input
                type="text"
                name="desarrollador"
                value={form.desarrollador}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Imagen (URL)</label>
              <input
                type="text"
                name="imagenPortada"
                value={form.imagenPortada}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  name="completado"
                  checked={form.completado}
                  onChange={handleChange}
                />
                ¿Completado?
              </label>
            </div>

            <button type="submit" className="btn-submit">
              Guardar Juego
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddGame;