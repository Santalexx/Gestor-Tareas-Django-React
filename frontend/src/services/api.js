// api.js
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para añadir el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejador de errores global
const errorHandler = (error) => {
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    error: error.message
  });

  // Manejo de errores de autenticación
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    return Promise.reject(error);
  }

  // Manejo específico de errores de validación
  if (error.response?.status === 400 && error.response?.data) {
    const errorData = error.response.data;
    if (typeof errorData === 'object') {
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

  // Mensaje de error para el usuario
  const errorMessage = 
    error.response?.data?.detail ||
    error.response?.data?.message ||
    error.response?.data?.error ||
    Object.values(error.response?.data || {})[0]?.[0] ||
    'Error en la operación';

  toast.error(errorMessage);
  return Promise.reject(error);
};

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  errorHandler
);

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/usuarios/', userData);
      toast.success('Registro exitoso');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/token/', credentials);
      
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        toast.success('¡Bienvenido!');
      }

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/login';
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export const tareasService = {
  getTareas: async () => {
    try {
      const response = await api.get('/tareas/');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  getTareaPorId: async (id) => {
    try {
      const response = await api.get(`/tareas/${id}/`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  crearTarea: async (tarea) => {
    try {
      const response = await api.post('/tareas/', tarea);
      toast.success('Tarea creada exitosamente');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  actualizarTarea: async (id, tarea) => {
    try {
      const response = await api.put(`/tareas/${id}/`, tarea);
      toast.success('Tarea actualizada exitosamente');
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  eliminarTarea: async (id) => {
    try {
      await api.delete(`/tareas/${id}/`);
      toast.success('Tarea eliminada exitosamente');
    } catch (error) {
      return errorHandler(error);
    }
  },

  getTareasPorEstado: async (estado) => {
    try {
      const response = await api.get(`/tareas/estado/${estado}/`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
};

export default api;