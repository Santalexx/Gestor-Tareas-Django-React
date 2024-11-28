/**
 * MAIN.JSX - El Punto de Inicio
 * ============================
 * Este archivo es como el interruptor principal que enciende toda la aplicación.
 * Es el primer archivo que se ejecuta cuando alguien visita nuestra página web.
 */

// Importamos las herramientas fundamentales de React
// Imagina que React es como el motor de un coche: necesitamos sus piezas básicas
import React from 'react';

// ReactDOM es el encargado de mostrar nuestra aplicación en el navegador
// Es como el sistema que conecta el motor (React) con las ruedas (el navegador)
import ReactDOM from 'react-dom/client';

// Importamos nuestra aplicación principal (App)
// App es como el plano completo de nuestra casa, que contiene todas las habitaciones
import App from './App.jsx';

// Importamos los estilos generales de la aplicación
// Son como el diseño y la decoración que se aplicará a toda la casa
import './index.css';

/**
 * Esta parte es donde realmente "encendemos" la aplicación:
 * 
 * 1. document.getElementById('root') - Busca en la página web un elemento con id="root"
 *    Es como encontrar el enchufe donde vamos a conectar nuestra aplicación
 * 
 * 2. ReactDOM.createRoot() - Prepara ese punto de conexión para nuestra aplicación
 *    Es como preparar el enchufe para que sea seguro y eficiente
 * 
 * 3. render() - Finalmente muestra nuestra aplicación en la página
 *    Es como encender el interruptor que da vida a toda la casa
 * 
 * 4. <React.StrictMode> - Es como un sistema de seguridad adicional
 *    Nos ayuda a encontrar posibles problemas mientras desarrollamos
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);