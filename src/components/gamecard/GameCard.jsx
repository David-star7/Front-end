// components/gamecard/GameCard.jsx - SIN LOADING
import { useState } from "react";
import "./GameCard.css";

function GameCard({ game, onEdit, onDelete }) {
  const [imageError, setImageError] = useState(false);

  const getDefaultImage = () => {
    const platform = game.plataforma?.toLowerCase() || '';
    
    if (platform.includes('playstation') || platform.includes('ps')) {
      return "https://images.igdb.com/igdb/image/upload/t_cover_big/ps5.png";
    } else if (platform.includes('xbox')) {
      return "https://images.igdb.com/igdb/image/upload/t_cover_big/xboxsx.png";
    } else if (platform.includes('nintendo') || platform.includes('switch')) {
      return "https://images.igdb.com/igdb/image/upload/t_cover_big/switch.png";
    } else if (platform.includes('pc')) {
      return "https://images.igdb.com/igdb/image/upload/t_cover_big/pc.png";
    } else {
      return "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png";
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEdit = () => {
    onEdit(game);
  };

  const handleDelete = () => {
    onDelete(game._id);
  };

  const getImageUrl = () => {
    if (imageError || !game.imagenPortada) {
      return getDefaultImage();
    }
    
    if (game.imagenPortada.includes('placeholder.com') || 
        game.imagenPortada.includes('flaticon.com')) {
      return getDefaultImage();
    }
    
    return game.imagenPortada;
  };

  return (
    <div className="game-card">
      <div className="image-container">
        <div
          className="game-image"
          style={{
            backgroundImage: `url(${getImageUrl()})`
          }}
          onError={handleImageError}
        ></div>
        
        <div className="platform-badge">
          {game.plataforma}
        </div>
      </div>

      <div className="game-info">
        <h3 className="game-title">{game.titulo}</h3>

        <p className="game-meta">
          {game.genero} 
          {game.añoLanzamiento && ` · ${game.añoLanzamiento}`}
          {game.desarrollador && ` · ${game.desarrollador}`}
        </p>

        {game.descripcion && (
          <p className="game-desc">{game.descripcion}</p>
        )}

        <div className="game-actions">
          <div className="status">
            {game.completado ? (
              <span className="badge completed">✔ Completado</span>
            ) : (
              <span className="badge pending">🎯 Pendiente</span>
            )}
          </div>

          <div className="action-buttons">
            <button 
              className="btn-edit"
              onClick={handleEdit}
              title="Editar juego"
            >
              ✏️
            </button>
            <button 
              className="btn-delete"
              onClick={handleDelete}
              title="Eliminar juego"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;