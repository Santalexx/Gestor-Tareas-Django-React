/**
 * VITE.CONFIG.JS - El Centro de Control de Desarrollo
 * ================================================
 * 
 * Imagina que estás construyendo una casa moderna y automatizada. Este archivo
 * sería como el panel de control central que configura cómo funcionan todos
 * los sistemas automatizados de la casa. En nuestro caso, configura cómo
 * Vite ayudará a construir y desarrollar nuestra aplicación React.
 * 
 * Vite (que significa "rápido" en francés) es una herramienta moderna que
 * hace que el desarrollo web sea más veloz y eficiente. Piensa en Vite
 * como un asistente personal muy eficiente que se encarga de todas las
 * tareas técnicas complejas mientras tú te concentras en programar.
 */

// Importamos las herramientas necesarias para configurar nuestro entorno
// defineConfig nos da ayuda inteligente mientras escribimos la configuración
import { defineConfig } from 'vite'

// Importamos el plugin oficial de React para Vite
// Este plugin es como un traductor especializado que ayuda a Vite a
// entender y procesar código de React de manera eficiente
import react from '@vitejs/plugin-react'

// Configuración principal de Vite
// El defineConfig es como un asistente que nos ayuda a escribir
// la configuración correctamente, sugiriéndonos opciones válidas
export default defineConfig({
  /**
   * PLUGINS - Los Asistentes Especializados
   * ====================================
   * Los plugins son como trabajadores especializados que añaden
   * capacidades específicas a Vite. En este caso, solo tenemos
   * el plugin de React, que es esencial para que nuestra aplicación
   * React funcione correctamente.
   * 
   * react() activa el plugin y lo configura automáticamente con
   * las mejores opciones para desarrollo con React, incluyendo:
   * - Actualización en tiempo real del código (Hot Module Replacement)
   * - Optimización automática del código
   * - Soporte para JSX
   * - Y muchas otras características útiles
   */
  plugins: [react()],
})

/**
 * NOTA SOBRE LA CONFIGURACIÓN
 * ==========================
 * Esta configuración es minimalista pero poderosa. Aunque parece
 * simple, el plugin de React está haciendo mucho trabajo tras
 * bambalinas para que nuestra experiencia de desarrollo sea
 * excelente. Si en el futuro necesitamos más características,
 * podemos añadir más opciones y plugins a esta configuración.
 */