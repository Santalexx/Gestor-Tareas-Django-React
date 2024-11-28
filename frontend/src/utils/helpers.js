// Importamos herramientas para trabajar con fechas y horas
// format: nos ayuda a dar formato bonito a las fechas
// parseISO: convierte texto de fecha a un formato que JavaScript entiende
import { format, parseISO } from 'date-fns';

// Importamos la configuración en español para las fechas
// Esto hace que los meses y días aparezcan en español
import { es } from 'date-fns/locale';

/**
 * formatDate: Función para mostrar fechas de forma bonita
 * Ejemplo: convierte "2024-02-28" en "28 de febrero, 2024"
 * Si no hay fecha, devuelve un texto vacío
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(parseISO(dateString), "d 'de' MMMM, yyyy", { locale: es });
};

/**
 * formatDateTime: Similar a formatDate, pero incluye la hora
 * Ejemplo: convierte "2024-02-28T15:30" en "28 de febrero, 2024 15:30"
 * Si no hay fecha y hora, devuelve un texto vacío
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return format(parseISO(dateString), "d 'de' MMMM, yyyy HH:mm", { locale: es });
};

/**
 * getColorEstado: Define los colores para cada estado de una tarea
 * Cada estado tiene su propio conjunto de colores para:
 * - Fondo (bg)
 * - Texto (text)
 * - Borde (border)
 * - Efecto al pasar el mouse (hover)
 * 
 * COMPLETADA: Verde (significa éxito)
 * INCOMPLETA: Rojo (significa que necesita atención)
 * PENDIENTE: Amarillo (significa que está en espera)
 */
export const getColorEstado = (estado) => {
  switch (estado) {
    case 'COMPLETADA':
      return {
        bg: 'bg-green-100',      // Fondo verde claro
        text: 'text-green-800',  // Texto verde oscuro
        border: 'border-green-500', // Borde verde medio
        hover: 'hover:bg-green-200', // Fondo verde más claro al pasar el mouse
      };
    case 'INCOMPLETA':
      return {
        bg: 'bg-red-100',        // Fondo rojo claro
        text: 'text-red-800',    // Texto rojo oscuro
        border: 'border-red-500',  // Borde rojo medio
        hover: 'hover:bg-red-200',  // Fondo rojo más claro al pasar el mouse
      };
    default: // PENDIENTE
      return {
        bg: 'bg-yellow-100',      // Fondo amarillo claro
        text: 'text-yellow-800',  // Texto amarillo oscuro
        border: 'border-yellow-500', // Borde amarillo medio
        hover: 'hover:bg-yellow-200', // Fondo amarillo más claro al pasar el mouse
      };
  }
};

/**
 * isAuthenticated: Verifica si el usuario ha iniciado sesión
 * Revisa si existe un token de acceso guardado
 * Devuelve:
 * - true: si el usuario está conectado
 * - false: si el usuario no ha iniciado sesión
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');  // Los !! convierten el resultado en true o false
};