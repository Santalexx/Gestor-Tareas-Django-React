from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, RegexValidator

class Tarea(models.Model):
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('COMPLETADA', 'Completada'),
        ('INCOMPLETA', 'Incompleta'),
    ]

    titulo = models.CharField(
        max_length=200,
        validators=[MinLengthValidator(3, 'El título debe tener al menos 3 caracteres')]
    )
    descripcion = models.TextField(blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateTimeField(null=True, blank=True)
    estado = models.CharField(
        max_length=20, 
        choices=ESTADO_CHOICES, 
        default='PENDIENTE',
        validators=[
            RegexValidator(
                regex='^(PENDIENTE|COMPLETADA|INCOMPLETA)$',
                message='Estado no válido',
                code='invalid_estado'
            )
        ]
    )
    usuario = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='tareas'
    )

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'

    def __str__(self):
        return f"{self.titulo} - {self.estado}"