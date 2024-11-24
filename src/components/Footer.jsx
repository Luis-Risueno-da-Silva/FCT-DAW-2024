import React from "react";

// Estilos del footer
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="miFooter">
      {/* Información de la página */}
      <div className="div_info">
        {/* Enlaces */}
        <div>
          <p>
            <a href="#" className="info_link">
              Sobre nosotros
            </a>{" "}
            &nbsp;
            <a href="#" className="info_link">
              Contacto
            </a>
          </p>
        </div>

        {/* Información */}
        <div>
          <p>
            <i class="bi bi-c-circle"></i> Baúl de juegos - V 1.0 - Powered by &nbsp;
            <a href="https://rawg.io/apidocs" className="info_link text-primary" target="_blank">
              RAWG
            </a>
          </p>
        </div>
      </div>
      {/* Fin de la información de la página */}

      {/* Redes sociales */}
      <div className="mt-3">
        <p>
          <a href="#" className="icono_link me-2"><i className="bi bi-discord"></i></a> &nbsp;
          <a href="#" className="icono_link me-2"><i className="bi bi-twitter-x"></i></a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
