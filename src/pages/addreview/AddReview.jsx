// pages/addreview/AddReview.jsx - CÓDIGO COMPLETO
import { useState, useEffect } from "react";
import { createReview, getGamesForReview } from "../../services/reviewService";
import "./AddReview.css";

function AddReview() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      try {
        setLoading(true);
        setError(null);
        const gamesData = await getGamesForReview();
        setGames(gamesData);
        
        if (gamesData.length === 0) {
          setError("No se encontraron juegos. Asegúrate de tener juegos creados primero.");
        }
      } catch (err) {
        console.error("Error cargando juegos:", err);
        setError("Error al cargar los juegos. Verifica que el backend esté funcionando.");
      } finally {
        setLoading(false);
      }
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
    
    if (!form.juegoId) {
      alert("Por favor selecciona un juego");
      return;
    }
    
    try {
      const reviewData = {
        ...form,
        horasJugadas: parseInt(form.horasJugadas),
        calificacion: parseInt(form.calificacion)
      };
      
      console.log("Enviando reseña:", reviewData);
      await createReview(reviewData);
      
      setModalOpen(true);
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
      console.error("Error detallado:", error);
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

          {loading && (
            <div className="loading-message">
              <p>Cargando juegos disponibles...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="addreview-form">
            
            {/* SELECTOR DE JUEGO MEJORADO */}
            <div className="form-group">
              <label>Juego *</label>
              <select
                name="juegoId"
                value={form.juegoId}
                onChange={handleChange}
                required
                disabled={loading || games.length === 0}
                style={{ 
                  color: form.juegoId ? 'var(--color-text-light)' : 'var(--color-text-secondary)'
                }}
              >
                <option value="" style={{ color: 'var(--color-text-secondary)' }}>
                  {games.length === 0 ? "No hay juegos disponibles" : "Selecciona un juego"}
                </option>
                {games.map((game) => (
                  <option 
                    key={game._id} 
                    value={game._id}
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    {game.titulo} - {game.plataforma} ({game.añoLanzamiento})
                  </option>
                ))}
              </select>
              {games.length > 0 && (
                <small className="help-text">
                  {games.length} juego(s) disponible(s)
                </small>
              )}
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
                disabled={loading}
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
                disabled={loading}
                style={{ color: 'var(--color-text-light)' }}
              >
                <option value="5" style={{ color: 'var(--color-text-light)' }}>⭐⭐⭐⭐⭐ (5) - Excelente</option>
                <option value="4" style={{ color: 'var(--color-text-light)' }}>⭐⭐⭐⭐ (4) - Muy Bueno</option>
                <option value="3" style={{ color: 'var(--color-text-light)' }}>⭐⭐⭐ (3) - Bueno</option>
                <option value="2" style={{ color: 'var(--color-text-light)' }}>⭐⭐ (2) - Regular</option>
                <option value="1" style={{ color: 'var(--color-text-light)' }}>⭐ (1) - Malo</option>
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
                disabled={loading}
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
                disabled={loading}
                style={{ color: 'var(--color-text-light)' }}
              >
                <option value="Muy Fácil" style={{ color: 'var(--color-text-light)' }}>Muy Fácil</option>
                <option value="Fácil" style={{ color: 'var(--color-text-light)' }}>Fácil</option>
                <option value="Media" style={{ color: 'var(--color-text-light)' }}>Media</option>
                <option value="Difícil" style={{ color: 'var(--color-text-light)' }}>Difícil</option>
                <option value="Muy Difícil" style={{ color: 'var(--color-text-light)' }}>Muy Difícil</option>
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
                disabled={loading}
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
                  disabled={loading}
                />
                ¿Recomendarías este juego?
              </label>
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading || games.length === 0}
            >
              {loading ? "Cargando..." : "📝 Publicar Reseña"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddReview;