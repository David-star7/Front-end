// pages/addreview/AddReview.jsx - COMPLETAMENTE CORREGIDO
import { useState, useEffect } from "react";
import { createReview, getGamesForReview } from "../../services/reviewService";
import "./AddReview.css";

function AddReview() {
  const [games, setGames] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [form, setForm] = useState({
    juegoId: "",
    usuario: "",
    calificacion: 5,
    horasJugadas: "",
    dificultad: "Media",
    comentario: "",
    recomendaria: true
  });

  // Cargar juegos para el select
  useEffect(() => {
    async function loadGames() {
      const gamesData = await getGamesForReview();
      setGames(gamesData);
    }
    loadGames();
  }, []);

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
      await createReview(form);
      
      // Mostrar modal de éxito
      setModalOpen(true);
      
      // Limpiar formulario
      setForm({
        juegoId: "",
        usuario: "",
        calificacion: 5,
        horasJugadas: "",
        dificultad: "Media",
        comentario: "",
        recomendaria: true
      });
      
    } catch (error) {
      alert("Error al crear la reseña: " + error.message);
    }
  };

  return (
    <>
      {/* MODAL DE ÉXITO */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>⭐ ¡Reseña creada exitosamente!</h3>
            <p>Tu reseña ha sido guardada correctamente.</p>
            <button onClick={() => setModalOpen(false)}>Aceptar</button>
          </div>
        </div>
      )}

      <div className="addreview-container">
        <div className="addreview-card">
          <h2>✍️ Crear Nueva Reseña</h2>

          <form onSubmit={handleSubmit} className="addreview-form">
            
            {/* SELECTOR DE JUEGO */}
            <div className="form-group">
              <label>Juego *</label>
              <select
                name="juegoId"
                value={form.juegoId}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un juego</option>
                {games.map((game) => (
                  <option key={game._id} value={game._id}>
                    {game.titulo} - {game.plataforma}
                  </option>
                ))}
              </select>
            </div>

            {/* USUARIO */}
            <div className="form-group">
              <label>Tu nombre *</label>
              <input
                type="text"
                name="usuario"
                value={form.usuario}
                onChange={handleChange}
                placeholder="Ej: David"
                required
              />
            </div>

            {/* CALIFICACIÓN */}
            <div className="form-group">
              <label>Calificación *</label>
              <select
                name="calificacion"
                value={form.calificacion}
                onChange={handleChange}
                required
              >
                <option value="5">⭐⭐⭐⭐⭐ (5) - Excelente</option>
                <option value="4">⭐⭐⭐⭐ (4) - Muy Bueno</option>
                <option value="3">⭐⭐⭐ (3) - Bueno</option>
                <option value="2">⭐⭐ (2) - Regular</option>
                <option value="1">⭐ (1) - Malo</option>
              </select>
            </div>

            {/* HORAS JUGADAS */}
            <div className="form-group">
              <label>Horas jugadas *</label>
              <input
                type="number"
                name="horasJugadas"
                value={form.horasJugadas}
                onChange={handleChange}
                placeholder="Ej: 45"
                min="1"
                required
              />
            </div>

            {/* DIFICULTAD */}
            <div className="form-group">
              <label>Dificultad *</label>
              <select
                name="dificultad"
                value={form.dificultad}
                onChange={handleChange}
                required
              >
                <option value="Muy Fácil">Muy Fácil</option>
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Difícil">Difícil</option>
                <option value="Muy Difícil">Muy Difícil</option>
              </select>
            </div>

            {/* COMENTARIO */}
            <div className="form-group">
              <label>Comentario *</label>
              <textarea
                name="comentario"
                value={form.comentario}
                onChange={handleChange}
                placeholder="Escribe tu experiencia con el juego..."
                rows="4"
                required
              ></textarea>
            </div>

            {/* RECOMENDACIÓN */}
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  name="recomendaria"
                  checked={form.recomendaria}
                  onChange={handleChange}
                />
                ¿Recomendarías este juego?
              </label>
            </div>

            <button type="submit" className="btn-submit">
              📝 Publicar Reseña
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddReview;