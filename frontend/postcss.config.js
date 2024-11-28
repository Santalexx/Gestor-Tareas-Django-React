/**
 * POSTCSS.CONFIG.JS - El Procesador de Estilos
 * ==========================================
 * 
 * Imagina que este archivo es como una línea de producción en una fábrica
 * de ropa. Antes de que la ropa (en nuestro caso, los estilos CSS) llegue
 * al cliente final, pasa por diferentes estaciones de trabajo que la mejoran
 * y la preparan. En nuestra "fábrica de estilos", tenemos dos estaciones
 * principales:
 */

export default {
  // La sección "plugins" define qué herramientas usaremos para procesar nuestros estilos
  plugins: {
    // Primera estación: Tailwind CSS
    // ============================
    // Tailwind es como nuestro diseñador principal. Toma nuestras instrucciones
    // de estilo simples (como 'text-red-500' o 'p-4') y las convierte en CSS
    // completo y detallado. Es como tener un experto en moda que traduce
    // descripciones simples en diseños elaborados.
    tailwindcss: {},

    // Segunda estación: Autoprefixer
    // ===========================
    // Autoprefixer es como nuestro control de calidad. Se asegura de que
    // nuestra "ropa" (estilos) se vea bien en todos los "cuerpos" (navegadores).
    // Añade automáticamente los prefijos necesarios (-webkit-, -moz-, etc.)
    // para que nuestros estilos funcionen en navegadores más antiguos.
    // Es como tener un experto que ajusta cada prenda para que le quede
    // bien a diferentes tipos de personas.
    autoprefixer: {},
  },
}