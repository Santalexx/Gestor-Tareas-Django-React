# Este archivo define la estructura de datos de nuestras tareas
# Piensa en él como el plano arquitectónico que describe cómo se organizará
# y almacenará la información de cada tarea en la base de datos

# Importamos las herramientas necesarias:
# - models: nos permite definir la estructura de datos
# - User: es el modelo de usuario que Django proporciona
# - Validadores: son herramientas para asegurar que los datos sean correctos
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, RegexValidator

# Definimos la clase Tarea, que es como una plantilla para crear tareas
# Cada tarea que creemos seguirá esta estructura
class Tarea(models.Model):
    # Definimos los estados posibles de una tarea
    # Es como un menú de opciones predefinidas para el estado de la tarea
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),    # La tarea está por hacerse
        ('COMPLETADA', 'Completada'),  # La tarea ya se realizó
        ('INCOMPLETA', 'Incompleta'),  # La tarea no se completó a tiempo
    ]

    # Cada línea siguiente define una característica de la tarea:

    # El título de la tarea (obligatorio, mínimo 3 caracteres)
    titulo = models.CharField(
        max_length=200,  # El título no puede tener más de 200 caracteres
        validators=[MinLengthValidator(3, 'El título debe tener al menos 3 caracteres')]
    )

    # La descripción de la tarea (opcional)
    descripcion = models.TextField(blank=True)

    # Fecha cuando se creó la tarea (se genera automáticamente)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    # Fecha límite para completar la tarea (opcional)
    fecha_vencimiento = models.DateTimeField(null=True, blank=True)

    # Estado actual de la tarea (pendiente por defecto)
    estado = models.CharField(
        max_length=20, 
        choices=ESTADO_CHOICES,     # Solo permite los estados definidos arriba
        default='PENDIENTE',        # Cuando se crea una tarea, está pendiente
        validators=[
            RegexValidator(         # Asegura que el estado sea válido
                regex='^(PENDIENTE|COMPLETADA|INCOMPLETA)$',
                message='Estado no válido',
                code='invalid_estado'
            )
        ]
    )

    # Vincula cada tarea con un usuario
    # Si se elimina el usuario, se eliminan todas sus tareas (CASCADE)
    usuario = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='tareas'       # Permite acceder a las tareas desde el usuario
    )

    # La clase Meta configura comportamientos adicionales del modelo
    class Meta:
        # Ordena las tareas por fecha de creación (las más nuevas primero)
        ordering = ['-fecha_creacion']
        # Define cómo se llamará en singular y plural en el admin
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'

    # Define cómo se mostrará la tarea en texto
    # Por ejemplo: "Hacer compras - PENDIENTE"
    def __str__(self):
        return f"{self.titulo} - {self.estado}"

# NOTA IMPORTANTE:
# Este archivo es fundamental porque:
# 1. Define la estructura de todas las tareas en el sistema
# 2. Establece las reglas y restricciones para los datos
# 3. Asegura que la información se almacene de manera consistente
# 4. Permite que Django cree las tablas necesarias en la base de datos