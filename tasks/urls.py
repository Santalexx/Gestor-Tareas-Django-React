# Este archivo es como el sistema de señalización de una ciudad
# Define todas las "direcciones" (URLs) que los usuarios pueden visitar en nuestra aplicación
# y qué debe hacer el sistema cuando alguien visita cada dirección

# Importamos las herramientas necesarias
# path y include son como los postes de señalización que indican las rutas
from django.urls import path, include
# DefaultRouter es como un organizador automático de direcciones
from rest_framework.routers import DefaultRouter
# Importamos las vistas que contienen la lógica de cada dirección
from . import views
from .views import TareaViewSet, UsuarioViewSet
# Importamos las vistas para manejar la autenticación (login/logout)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Para crear tokens de acceso (login)
    TokenRefreshView,     # Para renovar tokens expirados
)

# Creamos un "router" que automáticamente genera las rutas básicas
# Es como un mapa que organiza todas las direcciones principales
router = DefaultRouter()

# Registramos las rutas principales:
# 'usuarios' manejará todas las operaciones relacionadas con usuarios
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
# 'tareas' manejará todas las operaciones relacionadas con tareas
router.register(r'tareas', TareaViewSet, basename='tarea')

# Definimos la lista de todas las URLs de nuestra aplicación
urlpatterns = [
    # URLs para la autenticación (login/logout)
    # Cuando un usuario inicia sesión, obtiene un "token" (como una llave digital)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Si la "llave" expira, esta ruta permite renovarla sin hacer login de nuevo
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Incluimos todas las rutas que el router generó automáticamente
    path('', include(router.urls)),
    
    # Ruta especial para filtrar tareas por su estado
    # Por ejemplo: /tareas/estado/PENDIENTE/ mostrará solo las tareas pendientes
    path('tareas/estado/<str:estado>/', views.TareaViewSet.as_view({'get': 'por_estado'}), name='tareas-por-estado'),
]

# EXPLICACIÓN DE LOS MÉTODOS HTTP:
# Cada ruta puede responder a diferentes tipos de peticiones:

# GET: Es como "leer" - cuando quieres ver información
# Por ejemplo: ver la lista de tareas o los detalles de una tarea específica

# POST: Es como "crear" - cuando quieres añadir información nueva
# Por ejemplo: crear una nueva tarea o registrar un nuevo usuario

# PUT: Es como "actualizar" - cuando quieres modificar información existente
# Por ejemplo: cambiar el estado de una tarea de PENDIENTE a COMPLETADA

# DELETE: Es como "borrar" - cuando quieres eliminar información
# Por ejemplo: eliminar una tarea que ya no necesitas

# NOTA IMPORTANTE:
# Este archivo es fundamental porque:
# 1. Define todas las "direcciones" disponibles en nuestra aplicación
# 2. Conecta cada dirección con su función correspondiente
# 3. Organiza cómo los usuarios pueden interactuar con la aplicación
# 4. Maneja la seguridad básica a través del sistema de tokens