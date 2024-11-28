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

/**
 * Componente de Registro
 * Este archivo maneja toda la pantalla de registro de usuarios nuevos.
 * Incluye el formulario, las validaciones y el proceso de crear la cuenta.
 */
const Registro = () => {
  // Herramienta para redireccionar al usuario después del registro
  const navigate = useNavigate();
  
  // Estados para manejar la carga y los errores
  const [loading, setLoading] = useState(false);  // Indica si se está procesando el registro
  const [errors, setErrors] = useState({});       // Guarda los mensajes de error

  /**
   * Esta función se ejecuta cuando el usuario envía el formulario
   * Se encarga de:
   * 1. Validar los datos ingresados
   * 2. Enviar la información al servidor
   * 3. Mostrar mensajes de éxito o error
   */
  const handleSubmit = async (e) => {
    e.preventDefault();  // Evita que la página se recargue al enviar el formulario
    setLoading(true);   // Muestra el indicador de carga
    setErrors({});      // Limpia errores anteriores

    // Obtiene los datos ingresados en el formulario
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // VALIDACIONES: Verifica que los datos cumplan con los requisitos
    const newErrors = {};
    
    // Valida el nombre de usuario: solo letras, números y algunos caracteres especiales
    if (!username || !/^[a-zA-Z0-9@.+\-_]*$/.test(username)) {
      newErrors.username = 'El nombre de usuario solo puede contener letras, números y los caracteres @/./+/-/_';
    }

    // Valida que el correo tenga un formato válido (ejemplo@dominio.com)
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    // Valida que la contraseña tenga al menos 6 caracteres
    if (!password || password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Valida que las contraseñas coincidan
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Si hay errores, los muestra y detiene el proceso
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // PROCESO DE REGISTRO
    try {
      // Prepara los datos para enviar al servidor
      const userData = {
        username: username.trim(),
        email: email.trim(),
        password: password,
        password_confirmation: confirmPassword
      };

      // Intenta crear la cuenta
      await authService.register(userData);
      toast.success('¡Registro exitoso!');  // Muestra mensaje de éxito
      navigate('/login');                   // Redirecciona a la página de login
    } catch (error) {
      // Manejo de errores del servidor
      console.error('Error de registro:', error);
      
      if (error.response?.data) {
        // Procesa los errores que vienen del servidor
        const serverErrors = error.response.data;
        const formattedErrors = {};
        
        // Formatea los mensajes de error para mostrarlos
        Object.keys(serverErrors).forEach(key => {
          formattedErrors[key] = Array.isArray(serverErrors[key]) 
            ? serverErrors[key][0] 
            : serverErrors[key];
        });
        
        setErrors(formattedErrors);
        toast.error(Object.values(formattedErrors)[0]);
      } else {
        toast.error('Error al crear la cuenta');
      }
    } finally {
      setLoading(false);  // Quita el indicador de carga
    }
  };

  // INTERFAZ DEL FORMULARIO
  // Esta parte define cómo se ve el formulario de registro
  return (
    // Contenedor principal con fondo oscuro
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
      {/* Encabezado del formulario */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Crear una cuenta
        </h2>
        {/* Enlace para usuarios que ya tienen cuenta */}
        <p className="mt-2 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400">
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      {/* Contenedor del formulario */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Formulario de registro */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Campo de nombre de usuario */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`block w-full rounded-md border ${
                    errors.username ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {/* Mensaje de error para el usuario */}
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>
            </div>

            {/* Campo de correo electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`block w-full rounded-md border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {/* Mensaje de error para el correo */}
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`block w-full rounded-md border ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {/* Mensaje de error para la contraseña */}
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Campo de confirmación de contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirmar contraseña
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`block w-full rounded-md border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {/* Mensaje de error para la confirmación de contraseña */}
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {/* El texto del botón cambia durante el proceso de registro */}
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default Registro;