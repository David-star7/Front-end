import { useEffect, useState } from "react";
import { getGames } from "../../services/gameService";
import GameCard from "../../components/gamecard/GameCard";
import "./Games.css";

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function loadGames() {
      const data = await getGames();
      setGames(data.data || data); // soporta ambas respuestas
    }
    loadGames();
  }, []);

  return (
    <div className="games-page">
      <h1 className="games-title">🎮 Mi Biblioteca de Juegos</h1>

      <div className="games-grid">
        {games.length > 0 ? (
          games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))
        ) : (
          <p className="no-games">No tienes juegos registrados aún.</p>
        )}
      </div>
    </div>
  );
}

export default Games;
