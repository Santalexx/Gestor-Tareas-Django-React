# Este archivo es la configuración principal de nuestra aplicación 'tasks'
# Piensa en él como el documento de identidad de la aplicación, donde se definen
# sus características básicas y cómo se identifica dentro del proyecto Django

# Importamos AppConfig de django.apps, que es como un molde para configurar aplicaciones
from django.apps import AppConfig


# TasksConfig es la clase que define la configuración de nuestra aplicación
# Es como la tarjeta de presentación de nuestra aplicación de tareas
class TasksConfig(AppConfig):
    # default_auto_field define cómo se generarán los IDs únicos para cada tarea
    # BigAutoField significa que pueden haber muchísimas tareas (más de 2 mil millones)
    # Es como decirle a Django: "Prepárate para manejar una gran cantidad de tareas"
    default_auto_field = "django.db.models.BigAutoField"
    
    # name es el nombre con el que Django reconocerá nuestra aplicación
    # Este nombre es importante porque:
    # 1. Se usa para referenciar la aplicación en todo el proyecto
    # 2. Debe coincidir con el nombre de la carpeta de la aplicación
    # 3. Se utiliza en la configuración del proyecto (settings.py)
    name = "tasks"

# NOTA IMPORTANTE:
# Aunque este archivo parece simple, es fundamental porque:
# - Registra la aplicación en el proyecto Django
# - Permite que Django sepa que esta aplicación existe
# - Configura aspectos básicos del funcionamiento de la aplicación
# - Se crea automáticamente cuando iniciamos una nueva aplicación con 'python manage.py startapp'