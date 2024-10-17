import React from 'react'
import ReactDOM from 'react-dom/client'

// Importaciones necesaras para que las rutas de la página funcionen correctamente
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Importar estilos de bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

// Importar js de bootstrap
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

// Importar iconos de bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importar Componentes
import Layout from './components/Layout'
import Inicio from './components/Inicio'
import Juegos from './components/Juegos.jsx'
import UnVideojuego from './components/UnVideojuego.jsx'
import AllJuegos from './components/AllJuegos.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

    // Aquí dentro van todas las rutas de la página
    <BrowserRouter>

        {/* Rutas */}
        <Routes>

            {/* Rutas anidadas */}
            <Route path='/' element={<Layout />}>

                {/* La ruta inicial */}
                <Route index element={<Inicio />} />

                {/* La ruta de juegos */}
                <Route path='/juegos' element={<Juegos />}>
                    <Route path='/juegos' element={<AllJuegos />} />
                    <Route path=':slug' element={<UnVideojuego />}/>
                </Route>

            </Route>

            {/* Ruta por defecto cuando el usuario escribe una url incorrecta */}
            <Route path='*' element={<Navigate replace to={"/"} />} />

        </Routes>

    </BrowserRouter>

)
