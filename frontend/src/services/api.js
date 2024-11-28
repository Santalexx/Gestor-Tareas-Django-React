/**
 * ARCHIVO API.JS
 * Este archivo es como el centro de comunicaciones de la aplicación.
 * Se encarga de todas las conversaciones entre la aplicación y el servidor.
 */

// Importamos las herramientas necesarias para hacer peticiones al servidor y mostrar mensajes
import axios from 'axios';  // axios es como un mensajero que envía y recibe datos
import { toast } from 'react-hot-toast';  // toast muestra mensajes bonitos al usuario

// Definimos la dirección base del servidor
const API_URL = 'http://localhost:8000/api';

// Creamos nuestro mensajero personalizado con configuración básica
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',  // Le decimos que trabajaremos con datos en formato JSON
  }
});

// SISTEMA DE SEGURIDAD
// Este interceptor revisa cada mensaje antes de enviarlo y le añade el permiso del usuario (token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Busca el permiso del usuario
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Añade el permiso al mensaje
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * SISTEMA CENTRAL DE MANEJO DE ERRORES
 * Esta función se encarga de procesar todos los errores que puedan ocurrir
 * cuando hablamos con el servidor y mostrar mensajes apropiados al usuario
 */
const errorHandler = (error) => {
  // Registramos el error para poder diagnosticar problemas
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    error: error.message
  });

  // Si el error es porque el permiso expiró o no es válido
  if (error.response?.status === 401) {
    localStorage.removeItem('token');  // Eliminamos el permiso inválido
    window.location.href = '/login';  // Enviamos al usuario a iniciar sesión
    return Promise.reject(error);
  }

  // Si el error es por datos inválidos
  if (error.response?.status === 400 && error.response?.data) {
    const errorData = error.response.data;
    if (typeof errorData === 'object') {
      // Mostramos cada error encontrado
      Object.keys(errorData).forEach(key => {
        const message = Array.isArray(errorData[key]) 
          ? errorData[key][0] 
          : errorData[key];
        toast.error(message);
      });
    } else {
      toast.error('Error en la operación');
    }
  }

  // Preparamos un mensaje de error amigable para el usuario
  const errorMessage = 
    error.response?.data?.detail ||
    error.response?.data?.message ||
    error.response?.data?.error ||
    Object.values(error.response?.data || {})[0]?.[0] ||
    'Error en la operación';

  toast.error(errorMessage);
  return Promise.reject(error);
};

// Configuramos el sistema para que use nuestro manejador de errores
api.interceptors.response.use(
  (response) => response,
  errorHandler
);

/**
 * SERVICIOS DE AUTENTICACIÓN
 * Aquí definimos todas las funciones relacionadas con la cuenta del usuario:
 * - Registro de nuevos usuarios
 * - Inicio de sesión
 * - Cierre de sesión
 * - Verificación de autenticación
 */
export const authService = {
  // Función para registrar nuevos usuarios
  register: async (userData) => {
    try {
      const response = await api.post('/usuarios/', userData);
      toast.success('Registro exitoso');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  // Función para iniciar sesión
  login: async (credentials) => {
    try {
      const response = await api.post('/token/', credentials);
      
      if (response.data.access) {
        // Guardamos el permiso de acceso
        localStorage.setItem('token', response.data.access);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        toast.success('¡Bienvenido!');
      }

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  // Función para cerrar sesión
  logout: () => {
    localStorage.removeItem('token');  // Eliminamos el permiso
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/login';  // Enviamos al usuario a la página de login
  },

  // Función para verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');  // Verifica si existe un permiso
  }
};

/**
 * SERVICIOS DE TAREAS
 * Aquí definimos todas las operaciones que podemos hacer con las tareas:
 * - Obtener todas las tareas
 * - Obtener una tarea específica
 * - Crear nuevas tareas
 * - Actualizar tareas existentes
 * - Eliminar tareas
 * - Filtrar tareas por estado
 */
export const tareasService = {
  // Obtener todas las tareas
  getTareas: async () => {
    try {
      const response = await api.get('/tareas/');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  // Obtener una tarea específica por su ID
  getTareaPorId: async (id) => {
    try {
      const response = await api.get(`/tareas/${id}/`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  // Crear una nueva tarea
  crearTarea: async (tarea) => {
    try {
      const response = await api.post('/tareas/', tarea);
      // Solo mostrar mensaje si no es una actualización automática
      if (!tarea.actualizacionAutomatica) {
        toast.success('Tarea creada exitosamente');
      }
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  // Actualizar una tarea existente
  actualizarTarea: async (id, tarea) => {
    try {
      const response = await api.put(`/tareas/${id}/`, tarea);
      // Solo mostrar mensaje si no es una actualización automática
      if (!tarea.actualizacionAutomatica) {
        toast.success('Tarea actualizada exitosamente');
      }
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  // Eliminar una tarea
  eliminarTarea: async (id) => {
    try {
      await api.delete(`/tareas/${id}/`);
      toast.success('Tarea eliminada exitosamente');
    } catch (error) {
      return errorHandler(error);
    }
  },

  // Obtener tareas filtradas por estado
  getTareasPorEstado: async (estado) => {
    try {
      const response = await api.get(`/tareas/estado/${estado}/`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
};

// Exportamos la configuración de api para usarla en otros archivos
export default api;