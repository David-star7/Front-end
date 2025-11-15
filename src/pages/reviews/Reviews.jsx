
import { useEffect, useState } from "react";
import { getReviews } from "../../services/reviewService";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        const data = await getReviews();
        setReviews(data.data || data);
      } catch (err) {
        setError("Error al cargar las reseñas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  if (loading) return <div className="loading">Cargando reseñas...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="reviews-page">
      <h1 className="reviews-title">⭐ Mis Reseñas</h1>

      <div className="reviews-grid">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3 className="review-game">
                {review.juegoId?.titulo || `Juego ID: ${review.juegoId}`}
              </h3>

              <p className="review-stars">
                {"⭐".repeat(review.calificacion)}
              </p>

              <p className="review-text">{review.comentario}</p>

              <div className="review-meta">
                <p><strong>Usuario:</strong> {review.usuario}</p>
                <p><strong>Horas jugadas:</strong> {review.horasJugadas}</p>
                <p><strong>Dificultad:</strong> {review.dificultad}</p>
                <p><strong>¿Recomienda?:</strong> {review.recomendaria ? "Sí" : "No"}</p>
              </div>

              <p className="review-date">
                {new Date(review.fechaCreacion).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="no-reviews">Aún no has escrito reseñas.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;