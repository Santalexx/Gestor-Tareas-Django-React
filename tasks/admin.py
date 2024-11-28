# Este archivo es parte del panel de administración de Django
# El panel de administración es una interfaz web que Django proporciona automáticamente
# para gestionar los datos de tu aplicación de forma visual

# Importamos las herramientas necesarias de Django:
# - admin: proporciona la funcionalidad del panel de administración
# - Tarea: es nuestro modelo que definimos para manejar las tareas
from django.contrib import admin
from .models import Tarea

# Esta línea registra nuestro modelo 'Tarea' en el panel de administración
# Esto significa que:
# 1. Podrás ver todas las tareas en el panel de administración
# 2. Podrás crear nuevas tareas desde la interfaz web
# 3. Podrás editar tareas existentes
# 4. Podrás eliminar tareas
# 5. Podrás buscar y filtrar tareas
#
# Para acceder a esta interfaz, necesitas:
# 1. Iniciar el servidor de Django
# 2. Ir a la URL: http://tudominio/admin
# 3. Iniciar sesión con un usuario administrador
admin.site.register(Tarea)

# NOTA IMPORTANTE:
# Este archivo es fundamental para la gestión de datos desde el panel de administración.
# Sin este registro, las tareas no serían accesibles desde la interfaz administrativa.
# Es especialmente útil para:
# - Depuración y pruebas
# - Gestión manual de datos
# - Corrección de errores en los datos
# - Supervisión del sistema