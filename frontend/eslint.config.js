/**
 * ESLINT.CONFIG.JS - El Inspector de Código
 * ========================================
 * Este archivo configura ESLint, que es como un inspector de calidad
 * para nuestro código. Imagina que es como un corrector ortográfico,
 * pero para código de programación: revisa que todo esté bien escrito
 * y siga las mejores prácticas.
 */

// Importamos las herramientas de inspección básicas
import js from '@eslint/js'                    // Reglas básicas para JavaScript
import globals from 'globals'                  // Define variables globales disponibles
import react from 'eslint-plugin-react'        // Reglas específicas para React
import reactHooks from 'eslint-plugin-react-hooks'    // Reglas para los Hooks de React
import reactRefresh from 'eslint-plugin-react-refresh' // Ayuda con la actualización en vivo

// Exportamos la configuración del inspector
export default [
  // Indica qué carpetas ignorar en la inspección
  { ignores: ['dist'] },  // 'dist' contiene código generado automáticamente
  
  // Configuración principal
  {
    // Qué archivos debe revisar (todos los .js y .jsx)
    files: ['**/*.{js,jsx}'],
    
    // Opciones del lenguaje: como decirle al inspector qué versión 
    // de JavaScript estamos usando y qué características especiales necesitamos
    languageOptions: {
      ecmaVersion: 2020,                 // Usamos JavaScript moderno
      globals: globals.browser,          // Permitimos variables del navegador
      parserOptions: {
        ecmaVersion: 'latest',           // Siempre usar la última versión
        ecmaFeatures: { jsx: true },     // Permitir sintaxis JSX de React
        sourceType: 'module',            // Usamos sistema de módulos moderno
      },
    },

    // Configuración específica para React
    settings: { 
      react: { version: '18.3' }  // Indicamos qué versión de React usamos
    },

    // Plugins: herramientas adicionales de inspección
    plugins: {
      react,              // Plugin para React
      'react-hooks': reactHooks,    // Plugin para Hooks
      'react-refresh': reactRefresh, // Plugin para actualización en vivo
    },

    // Reglas: las normas que debe seguir nuestro código
    rules: {
      // Importamos conjuntos de reglas recomendadas
      ...js.configs.recommended.rules,           // Reglas básicas de JavaScript
      ...react.configs.recommended.rules,        // Reglas recomendadas de React
      ...react.configs['jsx-runtime'].rules,     // Reglas para JSX moderno
      ...reactHooks.configs.recommended.rules,   // Reglas para Hooks

      // Desactivamos algunas reglas específicas
      'react/jsx-no-target-blank': 'off',        // Permite target="_blank" en enlaces

      // Configuramos reglas personalizadas
      'react-refresh/only-export-components': [
        'warn',                                  // Nivel de advertencia
        { allowConstantExport: true },           // Permite exportar constantes
      ],
    },
  },
]