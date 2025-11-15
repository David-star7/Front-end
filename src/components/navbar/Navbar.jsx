// components/navbar/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">

        {/* LOGO */}
        <Link to="/" className="nav-logo">
          GameTracker 🎮
        </Link>

        {/* LINKS */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink to="/games">
              Juegos
            </NavLink>
          </li>

          <li>
            <NavLink to="/add-game">
              Añadir Juego
            </NavLink>
          </li>

          <li>
            <NavLink to="/reviews">
              Reseñas
            </NavLink>
          </li>

          <li>
            <NavLink to="/add-review">
              Añadir Reseña
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;