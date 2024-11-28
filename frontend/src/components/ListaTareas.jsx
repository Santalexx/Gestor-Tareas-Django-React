import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { tareasService } from '../services/api';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaActual, setTareaActual] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    return format(new Date(fecha), "d 'de' MMMM, yyyy HH:mm", { locale: es });
  };

  const cargarTareas = async () => {
    try {
      const data = await tareasService.getTareas();
      setTareas(data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      toast.error('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validación de campos requeridos
    const titulo = formData.get('titulo');
    if (!titulo || titulo.trim() === '') {
      toast.error('El título es requerido');
      return;
    }

    // Procesar fecha y hora de vencimiento
    const fecha = formData.get('fecha_vencimiento_date');
    const hora = formData.get('fecha_vencimiento_time');
    let fecha_vencimiento = null;
    
    if (fecha && hora) {
      fecha_vencimiento = new Date(`${fecha}T${hora}`).toISOString();
    }

    const nuevaTarea = {
      titulo: titulo.trim(),
      descripcion: formData.get('descripcion')?.trim() || '',
      estado: formData.get('estado') || 'PENDIENTE',
      fecha_vencimiento: fecha_vencimiento
    };

    try {
      if (tareaActual) {
        await tareasService.actualizarTarea(tareaActual.id, nuevaTarea);
        toast.success('Tarea actualizada exitosamente');
      } else {
        await tareasService.crearTarea(nuevaTarea);
        toast.success('Tarea creada exitosamente');
      }
      
      await cargarTareas();
      setModalAbierto(false);
      setTareaActual(null);
      e.target.reset();
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          'Error al procesar la tarea';
      toast.error(errorMessage);
    }
  };

  const eliminarTarea = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await tareasService.eliminarTarea(id);
        toast.success('Tarea eliminada exitosamente');
        await cargarTareas();
      } catch (error) {
        toast.error('Error al eliminar la tarea');
        console.error('Error al eliminar tarea:', error);
      }
    }
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'COMPLETADA':
        return 'border-green-600 bg-green-900/20';
      case 'INCOMPLETA':
        return 'border-red-600 bg-red-900/20';
      default:
        return 'border-yellow-600 bg-yellow-900/20';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Gestor de Tareas</h1>
          <button 
            onClick={() => {
              setTareaActual(null);
              setModalAbierto(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Nueva Tarea</span>
          </button>
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              {tareaActual ? 'Editar Tarea' : 'Nueva Tarea'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="titulo" className="block text-sm font-medium text-white mb-1">
                    Título
                  </label>
                  <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    placeholder="Título de la tarea"
                    defaultValue={tareaActual?.titulo}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="descripcion" className="block text-sm font-medium text-white mb-1">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción"
                    rows="4"
                    defaultValue={tareaActual?.descripcion}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="fecha_vencimiento" className="block text-sm font-medium text-white mb-1">
                    Fecha de vencimiento
                  </label>
                  <div className="flex space-x-2">
                    <input
                      id="fecha_vencimiento_date"
                      name="fecha_vencimiento_date"
                      type="date"
                      defaultValue={tareaActual?.fecha_vencimiento ? new Date(tareaActual.fecha_vencimiento).toISOString().split('T')[0] : ''}
                      className="flex-1 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
                    />
                    <input
                      id="fecha_vencimiento_time"
                      name="fecha_vencimiento_time"
                      type="time"
                      defaultValue={tareaActual?.fecha_vencimiento ? new Date(tareaActual.fecha_vencimiento).toTimeString().slice(0,5) : ''}
                      className="w-32 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-white mb-1">
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    defaultValue={tareaActual?.estado || 'PENDIENTE'}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="COMPLETADA">Completada</option>
                    <option value="INCOMPLETA">Incompleta</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['PENDIENTE', 'COMPLETADA', 'INCOMPLETA'].map((estado) => (
          <div key={estado} className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className={`text-xl font-semibold mb-4 ${
              estado === 'COMPLETADA' ? 'text-green-400' :
              estado === 'INCOMPLETA' ? 'text-red-400' :
              'text-yellow-400'
            }`}>
              {estado}
            </h2>
            <div className="space-y-4">
              {tareas
                .filter(tarea => tarea.estado === estado)
                .map(tarea => (
                  <div
                    key={tarea.id}
                    className={`border-l-4 rounded-lg p-4 ${getColorEstado(tarea.estado)} bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{tarea.titulo}</h3>
                        <p className="text-gray-300 text-sm mt-1">{tarea.descripcion}</p>
                        {tarea.fecha_vencimiento && (
                          <p className="text-sm text-gray-400 mt-2">
                            <span className="font-medium">Vence:</span> {formatearFecha(tarea.fecha_vencimiento)}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => eliminarTarea(tarea.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => {
                            setTareaActual(tarea);
                            setModalAbierto(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaTareas;