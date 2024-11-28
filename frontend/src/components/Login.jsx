/* 
 * Login.jsx
 * Este componente maneja la página de inicio de sesión de la aplicación.
 * Proporciona un formulario para que los usuarios ingresen sus credenciales
 * y accedan a sus tareas.
 */

// Importaciones de React y sus características
// useState: Para manejar el estado del formulario y el proceso de carga
import { useState } from 'react';
// Link y useNavigate: Herramientas de navegación entre páginas
// - Link: Crea enlaces navegables
// - useNavigate: Permite la navegación programática (desde el código)
import { Link, useNavigate } from 'react-router-dom';
// authService: Contiene las funciones para autenticación de usuarios
import { authService } from '../services/api';
// toast: Para mostrar notificaciones amigables al usuario
import { toast } from 'react-hot-toast';

// Definición del componente Login
const Login = () => {
  // navigate: Función para redireccionar al usuario después del login
  const navigate = useNavigate();
  // loading: Estado que controla si el formulario está procesando el inicio de sesión
  const [loading, setLoading] = useState(false);

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    // Previene que el formulario recargue la página
    e.preventDefault();
    // Activa el estado de carga
    setLoading(true);

    try {
      // Obtiene los datos del formulario usando FormData
      const formData = new FormData(e.target);
      // Crea un objeto con las credenciales del usuario
      const credentials = {
        username: formData.get('username'),
        password: formData.get('password'),
      };

      // Intenta iniciar sesión con las credenciales proporcionadas
      await authService.login(credentials);
      // Si el login es exitoso, muestra un mensaje de bienvenida
      toast.success('¡Bienvenido!');
      // Redirecciona al usuario a la página de tareas
      navigate('/tareas');
    } catch (err) {
      // Si hay un error, lo registra en la consola
      console.error('Login error:', err);
      // Muestra un mensaje de error al usuario
      toast.error('Usuario o contraseña incorrectos');
    } finally {
      // Desactiva el estado de carga sin importar el resultado
      setLoading(false);
    }
  };

  return (
    // Contenedor principal con fondo oscuro y centrado vertical
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
      {/* Sección del encabezado */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Título principal */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Iniciar Sesión
        </h2>
        {/* Enlace para registro de nuevos usuarios */}
        <p className="mt-2 text-center text-sm text-gray-400">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="font-medium text-blue-500 hover:text-blue-400">
            Regístrate aquí
          </Link>
        </p>
      </div>

      {/* Contenedor del formulario */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Formulario de inicio de sesión */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Campo de usuario */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                Usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Nombre de usuario"
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            {/* Botón de envío */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* El texto del botón cambia según el estado de carga */}
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default Login;