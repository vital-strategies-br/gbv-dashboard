import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RecifeLogo from "../img/recife_logo_white.svg";
import VitalLogo from "../img/vital_logo_white.png";
import ShowMenu from "../icons/show-menu.svg";
import "./Navbar.css";

function Navbar() {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const location = useLocation();

  const isSticky =
    location.pathname !== "/" && location.pathname !== "/#painel";

  return (
    <header className={`header ${!isSticky ? "non-sticky" : ""}`}>
      <div className="logo">
        <img src={RecifeLogo} alt="Recife Logo" />
        <img src={VitalLogo} alt="Vital Strategies Logo" />
      </div>
      <nav className={`nav ${!isNavMenuOpen ? "closed" : ""}`}>
        <Link to="/" onClick={() => { setIsNavMenuOpen(false); }}>
          Início
        </Link>
        <Link to="/#painel" onClick={() => setIsNavMenuOpen(false)}>
          Painel
        </Link>
        <Link to="/nota-tecnica" onClick={() => setIsNavMenuOpen(false)}>
          Nota técnica
        </Link>
      </nav>
      <img
        className="hamburguer-menu-icon"
        src={ShowMenu}
        alt="Show menu"
        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
      />
    </header>
  );
}

export default Navbar;
