# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.validators import RegexValidator, MinLengthValidator
from .models import Tarea

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=6,
        style={'input_type': 'password'}
    )
    password_confirmation = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password_confirmation')
        extra_kwargs = {
            'username': {
                'required': True,
                'validators': [
                    MinLengthValidator(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
                    RegexValidator(
                        regex='^[a-zA-Z0-9@.+-_]*$',
                        message='El nombre de usuario solo puede contener letras, números y los caracteres @/./+/-/_',
                        code='invalid_username'
                    ),
                ],
            },
            'email': {'required': True}
        }

    def validate(self, data):
        # Validar que las contraseñas coincidan
        if data.get('password') != data.get('password_confirmation'):
            raise serializers.ValidationError({
                "password": "Las contraseñas no coinciden"
            })
        return data

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso")
        return value

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("El correo electrónico es requerido")
            
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está registrado")
        return value

    def create(self, validated_data):
        # Remover password_confirmation del diccionario
        validated_data.pop('password_confirmation', None)
        
        try:
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

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ['id', 'titulo', 'descripcion', 'estado', 'fecha_creacion', 'fecha_vencimiento', 'usuario']
        read_only_fields = ['fecha_creacion', 'usuario']
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

    def validate_estado(self, value):
        if value not in dict(Tarea.ESTADO_CHOICES):
            raise serializers.ValidationError(
                'Estado no válido. Las opciones son: PENDIENTE, COMPLETADA, INCOMPLETA'
            )
        return value

    def validate_titulo(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                'El título debe tener al menos 3 caracteres'
            )
        return value.strip()