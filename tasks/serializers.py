# Este archivo es como un traductor entre la base de datos y la interfaz web
# Su trabajo es convertir los datos de un formato a otro y asegurarse de que
# toda la información sea válida antes de guardarla

# Importamos las herramientas necesarias
from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.validators import RegexValidator, MinLengthValidator
from .models import Tarea

# UsuarioSerializer maneja la creación y validación de usuarios
# Piensa en él como un formulario inteligente que verifica que todos los datos
# del usuario sean correctos antes de crear una cuenta
class UsuarioSerializer(serializers.ModelSerializer):
    # Configuramos el campo de contraseña
    # write_only=True significa que solo se usa para crear el usuario, no para mostrar información
    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=6,  # La contraseña debe tener al menos 6 caracteres
        style={'input_type': 'password'}  # Muestra asteriscos en lugar del texto
    )
    
    # Campo para confirmar la contraseña
    password_confirmation = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    # Configuración general del serializador de usuario
    class Meta:
        model = User  # Usamos el modelo de usuario de Django
        # Definimos qué campos queremos usar
        fields = ('id', 'username', 'email', 'password', 'password_confirmation')
        # Reglas adicionales para los campos
        extra_kwargs = {
            'username': {
                'required': True,  # El nombre de usuario es obligatorio
                'validators': [
                    # Debe tener al menos 3 caracteres
                    MinLengthValidator(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
                    # Solo permite ciertos caracteres
                    RegexValidator(
                        regex='^[a-zA-Z0-9@.+-_]*$',
                        message='El nombre de usuario solo puede contener letras, números y los caracteres @/./+/-/_',
                        code='invalid_username'
                    ),
                ],
            },
            'email': {'required': True}  # El email es obligatorio
        }

    # Función que verifica que las contraseñas coincidan
    def validate(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise serializers.ValidationError({
                "password": "Las contraseñas no coinciden"
            })
        return data

    # Verifica que el nombre de usuario no esté ya en uso
    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso")
        return value

    # Verifica que el email sea válido y no esté ya registrado
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("El correo electrónico es requerido")
            
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está registrado")
        return value

    # Crea el usuario en la base de datos
    def create(self, validated_data):
        # Eliminamos la confirmación de contraseña ya que no se guarda
        validated_data.pop('password_confirmation', None)
        
        try:
            # Creamos el usuario con los datos validados
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            return user
        except Exception as e:
            raise serializers.ValidationError({
                "error": str(e)
            })

# TareaSerializer maneja la conversión y validación de los datos de las tareas
# Es similar al UsuarioSerializer pero para las tareas
class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea  # Usamos el modelo Tarea que definimos
        # Definimos qué campos incluir
        fields = ['id', 'titulo', 'descripcion', 'estado', 'fecha_creacion', 'fecha_vencimiento', 'usuario']
        # Campos que no se pueden modificar directamente
        read_only_fields = ['fecha_creacion', 'usuario']
        # Mensajes de error personalizados para cada campo
        extra_kwargs = {
            'titulo': {
                'required': True,
                'error_messages': {
                    'blank': 'El título es requerido.',
                    'min_length': 'El título debe tener al menos 3 caracteres.'
                }
            },
            'estado': {
                'required': True,
                'error_messages': {
                    'invalid_choice': 'Estado no válido. Las opciones son: PENDIENTE, COMPLETADA, INCOMPLETA'
                }
            }
        }

    # Verifica que el estado sea válido
    def validate_estado(self, value):
        if value not in dict(Tarea.ESTADO_CHOICES):
            raise serializers.ValidationError(
                'Estado no válido. Las opciones son: PENDIENTE, COMPLETADA, INCOMPLETA'
            )
        return value

    # Verifica que el título tenga al menos 3 caracteres
    def validate_titulo(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                'El título debe tener al menos 3 caracteres'
            )
        return value.strip()

# NOTA IMPORTANTE:
# Este archivo es crucial porque:
# 1. Actúa como guardián de la calidad de los datos
# 2. Previene errores comunes al crear usuarios y tareas
# 3. Proporciona mensajes de error claros cuando algo sale mal
# 4. Asegura que solo se guarden datos válidos en la base de datos