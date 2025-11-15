import { useEffect, useState } from "react";
import { getReviews } from "../../services/reviewService";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function loadReviews() {
      const data = await getReviews();
      setReviews(data.data || data);
    }
    loadReviews();
  }, []);

  return (
    <div className="reviews-page">
      <h1 className="reviews-title">⭐ Mis Reseñas</h1>

      <div className="reviews-grid">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3 className="review-game">{review.juegoTitulo || "Juego"}</h3>

              <p className="review-stars">
                {"⭐".repeat(review.puntuacion)}
              </p>

              <p className="review-text">{review.textoReseña}</p>

              <div className="review-meta">
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
