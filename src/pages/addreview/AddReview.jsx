import { useEffect, useState } from "react";
import { getReviews } from "../../services/reviewService";
import "./AddReview.css";   

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
              <h3>Reseña del juego ID: {review.juegoId}</h3>

              <p><strong>Puntuación:</strong> {review.puntuacion} ⭐</p>
              <p><strong>Horas jugadas:</strong> {review.horasJugadas}</p>
              <p><strong>Dificultad:</strong> {review.dificultad}</p>

              <p className="review-text">{review.textoReseña}</p>

              <p className="recomienda">
                {review.recomendaria ? "👍 Lo recomendaría" : "👎 No lo recomiendo"}
              </p>
            </div>
          ))
        ) : (
          <p className="no-reviews">Aún no tienes reseñas registradas.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;
