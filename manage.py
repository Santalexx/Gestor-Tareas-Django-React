#!/usr/bin/env python
"""
Este archivo es la herramienta de comando principal de Django.
Piensa en él como el control remoto universal de tu proyecto Django.
Cuando ejecutas comandos como 'python manage.py runserver',
este es el archivo que hace que todo funcione.
"""

# Importamos las herramientas necesarias del sistema operativo
# os nos permite interactuar con el sistema operativo
# sys nos da acceso a variables y funciones específicas de Python
import os
import sys


def main():
    """
    Esta es la función principal que ejecuta todas las tareas administrativas.
    Es como el cerebro que coordina todas las operaciones del proyecto.
    """
    # Configuramos la ubicación de los ajustes de nuestro proyecto
    # Es como decirle a Django: "Aquí están todas las instrucciones de configuración"
    # 'api.settings' significa que los ajustes están en la carpeta 'api' en el archivo 'settings.py'
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

    try:
        # Intentamos importar el comando de Django que ejecutará nuestras tareas
        # Es como intentar encender el control remoto
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Si algo sale mal (por ejemplo, Django no está instalado),
        # mostramos un mensaje de error útil
        # Es como cuando el control remoto no funciona porque le faltan las baterías
        raise ImportError(
            "No se pudo importar Django. ¿Estás seguro de que está instalado y "
            "disponible en la variable de entorno PYTHONPATH? ¿Olvidaste "
            "activar el entorno virtual?"
        ) from exc
    
    # Si todo está bien, ejecutamos el comando que el usuario solicitó
    # sys.argv contiene el comando que el usuario escribió en la terminal
    # Por ejemplo: ['manage.py', 'runserver'] o ['manage.py', 'migrate']
    execute_from_command_line(sys.argv)


# Esta es una práctica estándar en Python
# Verifica si este archivo se está ejecutando directamente
# (y no siendo importado desde otro archivo)
if __name__ == '__main__':
    # Si es así, ejecuta la función principal
    main()

"""
NOTA IMPORTANTE:
Este archivo es fundamental porque:
1. Es el punto de entrada principal para administrar tu proyecto Django
2. Te permite ejecutar comandos importantes como:
   - runserver (iniciar el servidor de desarrollo)
   - migrate (actualizar la base de datos)
   - createsuperuser (crear un usuario administrador)
   - makemigrations (crear cambios en la base de datos)
   y muchos más.
3. Maneja la configuración inicial del proyecto
4. Proporciona mensajes de error útiles cuando algo sale mal

Piensa en manage.py como el centro de control de tu proyecto Django:
- Es como el control remoto que te permite manejar todas las funciones
- Sin él, tendrías que hacer muchas cosas manualmente
- Te ayuda a detectar problemas y te dice cómo solucionarlos
- Es la herramienta que usarás más frecuentemente al desarrollar
"""