# views.py
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UsuarioSerializer, TareaSerializer
from .models import Tarea

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response({
                    "user": UsuarioSerializer(user).data,
                    "message": "Usuario creado exitosamente"
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({
                    "error": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TareaViewSet(viewsets.ModelViewSet):
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tarea.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    def perform_update(self, serializer):
        tarea = serializer.instance
        if tarea.usuario != self.request.user:
            raise permissions.PermissionDenied("No tienes permiso para modificar esta tarea")
        serializer.save()

    @action(detail=False, methods=['get'])
    def por_estado(self, request, estado=None):
        if estado not in dict(Tarea.ESTADO_CHOICES):
            return Response(
                {'error': 'Estado no válido'},
                status=status.HTTP_400_BAD_REQUEST
            )
        tareas = self.get_queryset().filter(estado=estado)
        serializer = self.get_serializer(tareas, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        tarea = self.get_object()
        if tarea.usuario != request.user:
            raise permissions.PermissionDenied("No tienes permiso para eliminar esta tarea")
        return super().destroy(request, *args, **kwargs)