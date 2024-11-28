/* 
 * Layout.jsx
 * Este componente actúa como la plantilla principal de la aplicación.
 * Proporciona la estructura común para todas las páginas, incluyendo
 * la barra de navegación y el contenedor principal.
 */

// Fragment: Es un componente especial de React que nos permite agrupar múltiples elementos
// sin crear un elemento DOM adicional en el navegador. Es como una caja invisible
import { Fragment } from 'react';

// PropTypes: Es una herramienta de React que nos ayuda a verificar que los datos
// que recibe nuestro componente sean del tipo correcto. Funciona como un sistema
// de validación para prevenir errores
import PropTypes from 'prop-types';

// Componentes de Headless UI:
// - Disclosure: Maneja el menú desplegable en versión móvil
// - Menu: Crea el menú desplegable del perfil de usuario
// - Transition: Agrega animaciones suaves a los elementos que aparecen y desaparecen
import { Disclosure, Menu, Transition } from '@headlessui/react';

// Iconos de Heroicons:
// - Bars3Icon: El icono de "hamburguesa" (≡) para el menú móvil
// - XMarkIcon: El icono (×) para cerrar el menú móvil
// - UserCircleIcon: El icono de perfil de usuario
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// authService: Contiene todas las funciones relacionadas con la autenticación
// como iniciar sesión, cerrar sesión, y verificar el estado del usuario.
// Se importa desde nuestra propia carpeta de servicios
import { authService } from '../services/api';

// Utilidad para combinar nombres de clases de manera condicional
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

// Componente principal Layout que envuelve toda la aplicación
export default function Layout({ children }) {
    // Definición de las rutas de navegación disponibles
    const navigation = [
        { name: 'Tareas', href: '/tareas', current: true },
    ];

    // Manejador para el cierre de sesión
    const handleLogout = () => {
        authService.logout();
    };

    return (
        // Contenedor principal con fondo oscuro
        <div className="min-h-screen bg-gray-900">
            {/* Barra de navegación principal */}
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        {/* Contenedor de la barra de navegación */}
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                {/* Sección izquierda: Logo y navegación */}
                                <div className="flex items-center">
                                    {/* Logo/Título de la aplicación */}
                                    <div className="flex-shrink-0">
                                        <h1 className="text-white font-bold text-xl">Gestor de Tareas</h1>
                                    </div>
                                    {/* Enlaces de navegación para pantallas grandes */}
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sección derecha: Menú de usuario para pantallas grandes */}
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {/* Menú desplegable del usuario */}
                                        <Menu as="div" className="relative ml-3">
                                            {/* Botón del perfil de usuario */}
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>
                                            {/* Animación del menú desplegable */}
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                {/* Opciones del menú de usuario */}
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={handleLogout}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                                )}
                                                            >
                                                                Cerrar sesión
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>

                                {/* Botón de menú móvil */}
                                <div className="-mr-2 flex md:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        {/* Icono cambia según el estado del menú */}
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        {/* Panel de navegación móvil */}
                        <Disclosure.Panel className="md:hidden">
                            {/* Enlaces de navegación para móvil */}
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            {/* Sección de usuario para móvil */}
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            {/* Contenedor principal del contenido */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
        </div>
    );
}

// Validación de propiedades del componente
Layout.propTypes = {
    // children es requerido y debe ser un elemento válido de React
    children: PropTypes.node.isRequired
};