import "./GameCard.css";

function GameCard({ game }) {
  return (
    <div className="game-card">

      <div
        className="game-image"
        style={{
          backgroundImage: `url(${game.imagenPortada || "https://cdn-icons-png.flaticon.com/512/1384/1384060.png"})`
        }}
      ></div>

      <div className="game-info">
        <h3 className="game-title">{game.titulo}</h3>

        <p className="game-meta">
          {game.genero} · {game.plataforma}
        </p>

        <p className="game-desc">{game.descripcion}</p>

        <div className="status">
          {game.completado ? (
            <span className="badge completed">✔ Completado</span>
          ) : (
            <span className="badge pending">🎯 Pendiente</span>
          )}
        </div>
      </div>

    </div>
  );
}

export default GameCard;
