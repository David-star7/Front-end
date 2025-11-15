
import { useEffect, useState } from "react";
import { getGames, deleteGame, updateGame } from "../../services/gameService";
import GameCard from "../../components/gamecard/GameCard";
import "./Games.css";

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para el modal de eliminar
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // Estados para el modal de edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);

  // Cargar juegos
  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await getGames();
      setGames(data.data || data);
    } catch (err) {
      setError("Error al cargar los juegos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  // Funciones para eliminar
  const handleDeleteClick = (gameId, gameTitle) => {
    setGameToDelete({ id: gameId, title: gameTitle });
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setGameToDelete(null);
    setDeleteLoading(false);
  };

  const handleConfirmDelete = async () => {
    if (!gameToDelete) return;
    
    try {
      setDeleteLoading(true);
      await deleteGame(gameToDelete.id);
      
      handleCloseDeleteModal();
      await loadGames();
      
    } catch (error) {
      alert("Error al eliminar el juego: " + error.message);
      handleCloseDeleteModal();
    }
  };

  // Funciones para editar
  const handleEditClick = (game) => {
    setGameToEdit(game);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setGameToEdit(null);
  };

  const handleConfirmEdit = async () => {
    if (!gameToEdit) return;
    
    try {
      // Por ahora mostramos un mensaje, luego implementaremos el formulario completo
      handleCloseEditModal();
      
      // Mostrar notificación de éxito
      setTimeout(() => {
        alert(`🎮 ¡Función de edición próxima!\n\nPronto podrás editar "${gameToEdit.titulo}" con un formulario completo.`);
      }, 300);
      
    } catch (error) {
      alert("Error al editar el juego: " + error.message);
      handleCloseEditModal();
    }
  };

  if (loading) return <div className="loading">Cargando juegos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      {/* MODAL DE CONFIRMACIÓN PARA ELIMINAR */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🗑️ Eliminar Juego</h3>
            <p>
              ¿Estás seguro de que quieres eliminar 
              <strong> "{gameToDelete?.title}"</strong>?
            </p>
            <p className="warning-text">
              Esta acción no se puede deshacer.
            </p>
            
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={handleCloseDeleteModal}
                disabled={deleteLoading}
              >
                Cancelar
              </button>
              <button 
                className="btn-confirm-delete"
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Eliminando..." : "Sí, Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal edit-modal">
            <h3>✏️ Editar Juego</h3>
            <div className="game-preview">
              <div 
                className="preview-image"
                style={{
                  backgroundImage: `url(${gameToEdit?.imagenPortada || "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png"})`
                }}
              ></div>
              <div className="preview-info">
                <h4>{gameToEdit?.titulo}</h4>
                <p>{gameToEdit?.genero} · {gameToEdit?.plataforma}</p>
                <p>{gameToEdit?.añoLanzamiento}</p>
              </div>
            </div>
            
            <p>
              Próximamente podrás editar todos los detalles de 
              <strong> "{gameToEdit?.titulo}"</strong> con un formulario completo.
            </p>
            <p className="info-text">
              🚀 Esta función estará disponible en la próxima actualización.
            </p>
            
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={handleCloseEditModal}
              >
                Entendido
              </button>
              <button 
                className="btn-confirm-edit"
                onClick={handleConfirmEdit}
              >
                ¡Genial, esperaré!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="games-page">
        <h1 className="games-title">🎮 Mi Biblioteca de Juegos</h1>

        <div className="games-grid">
          {games.length > 0 ? (
            games.map((game) => (
              <GameCard 
                key={game._id} 
                game={game}
                onEdit={handleEditClick}
                onDelete={(id) => handleDeleteClick(id, game.titulo)}
              />
            ))
          ) : (
            <p className="no-games">No tienes juegos registrados aún.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Games;