import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(parseISO(dateString), "d 'de' MMMM, yyyy", { locale: es });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return format(parseISO(dateString), "d 'de' MMMM, yyyy HH:mm", { locale: es });
};

export const getColorEstado = (estado) => {
  switch (estado) {
    case 'COMPLETADA':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-500',
        hover: 'hover:bg-green-200',
      };
    case 'INCOMPLETA':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-500',
        hover: 'hover:bg-red-200',
      };
    default: // PENDIENTE
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-500',
        hover: 'hover:bg-yellow-200',
      };
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};