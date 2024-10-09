import React from 'react'

// Importar Link
import { Link } from 'react-router-dom'

// Importar los estilos del menú
import "../styles/menu.css"

const Menu = () => {
  return (
    <div>

        {/* Navegador de la página */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">

                    {/* Para ir al Home */}
                    <li className="nav-item me-2">
                        <Link to={"/"} className='nav_item_style'>Inicio</Link>
                    </li>

                    {/* Para ir a Juegos */}
                    <li className="nav-item me-2">
                        <Link to={"/juegos"} className='nav_item_style'>Juegos</Link>
                    </li>

                    {/* Para ir a Iniciar sesión */}
                    <li className="nav-item me-2">
                        <Link to={"/"} className='nav_item_style'>Iniciar sesión</Link>
                    </li>

                    {/* Para ir a Registrarse */}
                    <li className="nav-item me-2">
                        <Link to={"/"} className='nav_item_style'>Registrarse</Link>
                    </li>

                </ul>
            </div>
            </div>
        </nav>
        
    </div>
  )
}

export default Menu