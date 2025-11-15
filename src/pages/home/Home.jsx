import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">🎮 Bienvenido a GameTracker</h1>

        <p className="home-text">
          Organiza tu biblioteca de videojuegos, lleva registro de tus avances
          y escribe reseñas fácilmente. Tu propio espacio gamer.
        </p>

        <div className="home-buttons">
          <Link to="/games" className="btn home-btn">
            Ver Juegos
          </Link>

          <Link to="/add-game" className="btn home-btn-secondary">
            Agregar Juego
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
