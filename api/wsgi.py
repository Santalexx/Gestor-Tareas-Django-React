# Este archivo es el punto de entrada principal para tu aplicación web cuando se ejecuta en un servidor.
# WSGI (Web Server Gateway Interface) es como un "traductor universal" que permite que tu
# aplicación Django se comunique con cualquier servidor web de manera estándar.

# Importamos la biblioteca 'os' que nos permite interactuar con el sistema operativo,
# como por ejemplo, configurar variables de entorno
import os

# Importamos la función que configurará nuestra aplicación para usar WSGI
# Esta función es como un "constructor" que prepara todo lo necesario para que
# tu aplicación pueda comunicarse con el servidor web
from django.core.wsgi import get_wsgi_application

# Aquí le decimos a Django dónde encontrar todas las configuraciones de la aplicación
# Es como darle un mapa a Django para que sepa dónde está todo lo que necesita
# En este caso, le decimos que busque la configuración en la carpeta 'api'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

# Finalmente, creamos la aplicación WSGI
# Esta línea es como "encender el motor" de tu aplicación
# Cuando alguien visita tu sitio web, esta es la parte que recibe la visita
# y se asegura de que todo funcione correctamente
application = get_wsgi_application()