from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import TareaViewSet, UsuarioViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'tareas', TareaViewSet, basename='tarea')

urlpatterns = [
    # URLs para JWT Authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # URLs para la API
    path('', include(router.urls)),
    
    # URL específica para filtrar tareas por estado
    path('tareas/estado/<str:estado>/', views.TareaViewSet.as_view({'get': 'por_estado'}), name='tareas-por-estado'),
]

# Este codigo genera lo siguiente:

# GET: Solicita datos del servidor.
# POST: Envía datos al servidor para crear un recurso.
# PUT: Envía datos al servidor para actualizar un recurso existente.
# DELETE: Elimina un recurso del servidor.