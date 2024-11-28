/**
 * TAILWIND.CONFIG.JS - La Paleta del Pintor Digital
 * ===============================================
 * 
 * Imagina que este archivo es como el estudio de un pintor, donde organizamos
 * todas las herramientas y colores que usaremos para dar vida a nuestra aplicación.
 * Así como un pintor necesita su paleta de colores y sus pinceles organizados,
 * nosotros necesitamos esta configuración para mantener un diseño consistente.
 */

/** 
 * Esta línea le dice a nuestro editor de código qué tipo de configuración es esta,
 * es como poner una etiqueta en una caja de herramientas para saber qué contiene
 */
/** @type {import('tailwindcss').Config} */

export default {
  /**
   * CONTENT - Los Lienzos de Nuestra Aplicación
   * =========================================
   * Aquí definimos dónde Tailwind debe buscar clases de estilos.
   * Es como decirle al pintor: "Estos son los lienzos donde vas a trabajar"
   */
  content: [
    "./index.html",                    // El archivo HTML principal
    "./src/**/*.{js,ts,jsx,tsx}",      // Todos los archivos de código en src
  ],

  /**
   * THEME - Nuestra Paleta de Colores y Estilos
   * =========================================
   * Aquí personalizamos los estilos que queremos usar en nuestra aplicación.
   * Es como crear nuestra propia paleta de colores personalizada.
   */
  theme: {
    extend: {
      /**
       * COLORS - Nuestra Escala de Grises Personalizada
       * ============================================
       * Definimos una paleta de colores oscuros personalizada.
       * Es como crear diferentes tonos de un mismo color, desde el más 
       * claro (50) hasta el más oscuro (900).
       */
      colors: {
        dark: {
          50: '#f9fafb',   // Casi blanco - Como una niebla muy ligera
          100: '#f3f4f6',  // Gris muy claro - Como papel reciclado
          200: '#e5e7eb',  // Gris claro - Como nubes dispersas
          300: '#d1d5db',  // Gris medio claro - Como piedra caliza
          400: '#9ca3af',  // Gris medio - Como acera mojada
          500: '#6b7280',  // Gris neutro - Como asfalto seco
          600: '#4b5563',  // Gris oscuro - Como pizarra
          700: '#374151',  // Gris muy oscuro - Como carbón
          800: '#1f2937',  // Casi negro - Como noche sin luna
          900: '#111827',  // El más oscuro - Como el espacio profundo
        },
      },
    },
  },

  /**
   * PLUGINS - Nuestras Herramientas Adicionales
   * ========================================
   * Aquí podríamos agregar plugins para extender las capacidades de Tailwind,
   * como nuevas herramientas en el estudio de un pintor. Por ahora, no
   * estamos usando ninguno adicional.
   */
  plugins: [],
}