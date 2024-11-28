# Este archivo es como el "mapa de navegación" principal de la aplicación.
# Aquí definimos las rutas principales a las que los usuarios pueden acceder.

# Importamos las herramientas necesarias:
# - admin: Para el panel de administración de Django
# - path: Para crear las rutas
# - include: Para incluir rutas de otras aplicaciones
from django.contrib import admin
from django.urls import path, include

# Importamos las vistas especiales para manejar la autenticación con tokens JWT
# Estos tokens son como "llaves digitales" que permiten a los usuarios acceder a sus datos
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Aquí definimos todas las rutas principales de la aplicación
urlpatterns = [
    # Ruta para el panel de administración
    # Cuando alguien visita /admin/, accede al panel de control del sistema
    path('admin/', admin.site.urls),
    
    # Ruta para todas las funcionalidades relacionadas con las tareas
    # Cuando alguien visita /api/..., se dirige a las funciones de gestión de tareas
    path('api/', include('tasks.urls')),
    
    # Rutas para la autenticación de usuarios:
    
    # Esta ruta (/api/token/) es para cuando un usuario inicia sesión
    # Le da al usuario sus "llaves digitales" (tokens) para acceder al sistema
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Esta ruta (/api/token/refresh/) es para renovar las "llaves digitales"
    # Cuando la llave está por expirar, esta ruta permite obtener una nueva
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]