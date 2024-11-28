/**
 * APP.JSX
 * Este es el archivo principal de la aplicación, como si fuera el índice de un libro.
 * Aquí se define la estructura general y las rutas que el usuario puede visitar.
 */

// Importamos las herramientas para manejar la navegación entre páginas
// Piensa en esto como en el sistema de navegación de un GPS
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importamos el sistema de notificaciones para mostrar mensajes al usuario
import { Toaster } from 'react-hot-toast';

// PropTypes nos ayuda a verificar que los datos que pasamos sean correctos
import PropTypes from 'prop-types';

// Importamos las diferentes pantallas y componentes de nuestra aplicación
import Layout from './components/Layout';           // El diseño general de la aplicación
import Login from './components/Login';             // Pantalla de inicio de sesión
import Registro from './components/Registro';       // Pantalla de registro
import ListaTareas from './components/ListaTareas'; // Pantalla principal de tareas

/**
 * RutaProtegida
 * Esta función es como un guardia de seguridad que:
 * 1. Verifica si el usuario tiene permiso (token) para ver una página
 * 2. Si no tiene permiso, lo envía a la página de login
 * 3. Si tiene permiso, le muestra el contenido dentro del diseño general
 */
const RutaProtegida = ({ children }) => {
  // Busca el token (permiso) del usuario
  const token = localStorage.getItem('token');
  
  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Si hay token, muestra el contenido dentro del Layout
  return <Layout>{children}</Layout>;
};

// Definimos qué tipo de datos espera recibir RutaProtegida
RutaProtegida.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * App
 * Esta es la función principal que define toda la estructura de la aplicación.
 * Es como el plano de un edificio que muestra dónde está cada cosa.
 */
function App() {
  return (
    <>
      {/* Configuración del sistema de notificaciones (Toaster) */}
      <Toaster
        position="top-right"  // Las notificaciones aparecerán arriba a la derecha
        toastOptions={{
          duration: 3000,     // Cada mensaje se mostrará por 3 segundos
          style: {
            background: '#333',  // Fondo oscuro
            color: '#fff',       // Texto blanco
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',  // Color verde para mensajes de éxito
            },
          },
        }}
      />

      {/* Sistema de navegación (Router) */}
      <Router>
        <Routes>
          {/* Rutas públicas: cualquiera puede acceder */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          {/* Rutas protegidas: solo usuarios con sesión iniciada */}
          <Route
            path="/tareas"
            element={
              <RutaProtegida>
                <ListaTareas />
              </RutaProtegida>
            }
          />
          
          {/* Ruta por defecto: si el usuario va a '/', lo enviamos a '/tareas' */}
          <Route path="/" element={<Navigate to="/tareas" replace />} />
        </Routes>
      </Router>
    </>
  );
}

// Exportamos App para que otros archivos puedan usarla
export default App;