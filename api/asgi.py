# Este archivo es como el "despachador" de la aplicación para conexiones modernas y rápidas.
# ASGI permite que tu aplicación maneje múltiples tipos de conexiones al mismo tiempo,
# lo que la hace más eficiente.

# Importamos la biblioteca 'os' que nos permite interactuar con el sistema operativo
import os

# Importamos la función que configurará nuestra aplicación para usar ASGI
# Esta función viene de Django y hace todo el trabajo pesado por nosotros
from django.core.asgi import get_asgi_application

# Aquí le decimos a Django dónde encontrar la configuración principal de la aplicación
# Es como decirle: "Hey, cuando necesites saber cómo está configurado todo, 
# busca en la carpeta 'api' el archivo 'settings.py'"
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

# Finalmente, creamos la aplicación ASGI
# Esto es como encender el motor que manejará todas las conexiones web
application = get_asgi_application()