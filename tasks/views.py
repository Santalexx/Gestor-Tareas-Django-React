# Este archivo contiene la lógica principal de nuestra aplicación
# Piensa en él como el "cerebro" que decide qué hacer cuando los usuarios
# interactúan con la aplicación (crear tareas, ver tareas, etc.)

# Importamos las herramientas necesarias para hacer funcionar nuestra aplicación
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UsuarioSerializer, TareaSerializer
from .models import Tarea

# UsuarioViewSet maneja todas las operaciones relacionadas con usuarios
# Es como un controlador que sabe cómo crear, modificar y gestionar usuarios
class UsuarioViewSet(viewsets.ModelViewSet):
    # Obtiene todos los usuarios de la base de datos
    queryset = User.objects.all()
    # Usa el UsuarioSerializer para convertir los datos
    serializer_class = UsuarioSerializer
    
    # Define quién puede acceder a cada operación
    def get_permissions(self):
        # Si alguien quiere crear un usuario nuevo (registrarse),
        # no necesita estar autenticado
        if self.action == 'create':
            return [AllowAny()]
        # Para todas las demás operaciones, debe estar autenticado
        return [IsAuthenticated()]

    # Método para crear un nuevo usuario
    def create(self, request, *args, **kwargs):
        # Intenta crear el usuario con los datos recibidos
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                # Si los datos son válidos, crea el usuario
                user = serializer.save()
                # Responde con un mensaje de éxito
                return Response({
                    "user": UsuarioSerializer(user).data,
                    "message": "Usuario creado exitosamente"
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                # Si algo sale mal, devuelve el error
                return Response({
                    "error": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        # Si los datos no son válidos, devuelve los errores
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# TareaViewSet maneja todas las operaciones relacionadas con tareas
# Es como un organizador que sabe cómo crear, mostrar y gestionar tareas
class TareaViewSet(viewsets.ModelViewSet):
    # Usa el TareaSerializer para convertir los datos
    serializer_class = TareaSerializer
    # Solo usuarios autenticados pueden acceder a las tareas
    permission_classes = [IsAuthenticated]

    # Obtiene solo las tareas del usuario actual
    # Es como un filtro que asegura que cada usuario vea solo sus propias tareas
    def get_queryset(self):
        return Tarea.objects.filter(usuario=self.request.user)

    # Cuando se crea una nueva tarea, la asocia al usuario actual
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    # Cuando se actualiza una tarea, verifica que pertenezca al usuario
    def perform_update(self, serializer):
        tarea = serializer.instance
        # Si la tarea no pertenece al usuario, no permite modificarla
        if tarea.usuario != self.request.user:
            raise permissions.PermissionDenied("No tienes permiso para modificar esta tarea")
        serializer.save()

    # Método especial para filtrar tareas por estado
    # Por ejemplo: obtener solo las tareas PENDIENTES o COMPLETADAS
    @action(detail=False, methods=['get'])
    def por_estado(self, request, estado=None):
        # Verifica que el estado sea válido
        if estado not in dict(Tarea.ESTADO_CHOICES):
            return Response(
                {'error': 'Estado no válido'},
                status=status.HTTP_400_BAD_REQUEST
            )
        # Filtra las tareas por el estado solicitado
        tareas = self.get_queryset().filter(estado=estado)
        serializer = self.get_serializer(tareas, many=True)
        return Response(serializer.data)

    # Método para eliminar una tarea
    def destroy(self, request, *args, **kwargs):
        tarea = self.get_object()
        # Verifica que la tarea pertenezca al usuario antes de eliminarla
        if tarea.usuario != request.user:
            raise permissions.PermissionDenied("No tienes permiso para eliminar esta tarea")
        return super().destroy(request, *args, **kwargs)

# NOTA IMPORTANTE:
# Este archivo es crucial porque:
# 1. Contiene toda la lógica de negocio de la aplicación
# 2. Maneja la seguridad y los permisos
# 3. Asegura que cada usuario solo pueda ver y modificar sus propias tareas
# 4. Define cómo responde la aplicación a cada tipo de solicitud
#
# Piensa en este archivo como un bibliotecario que:
# - Sabe dónde está cada libro (tarea)
# - Solo te permite ver y modificar tus propios libros
# - Mantiene todo organizado y seguro
# - Sabe exactamente qué hacer cuando le pides algo específico