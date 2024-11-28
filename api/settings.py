# Este archivo es el cerebro de la configuración de tu aplicación.
# Aquí se define cómo funciona todo y qué características están activadas.

# Importamos las herramientas necesarias para manejar rutas y tiempo
from pathlib import Path
from datetime import timedelta

# Definimos la carpeta principal del proyecto
# Es como establecer el "hogar" de la aplicación
BASE_DIR = Path(__file__).resolve().parent.parent

# CONFIGURACIÓN DE SEGURIDAD
# Esta es la llave secreta de tu aplicación - en producción debe ser diferente y segura
SECRET_KEY = 'django-insecure-d8-t)%lxwvt&e^e!$mn0%yr(!%*tzeoz^@sf!sps^a!z*_(8ow'

# Modo de desarrollo activado - muestra errores detallados
# En producción debe estar en False por seguridad
DEBUG = True

# Lista de direcciones desde donde se puede acceder a la aplicación
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# APLICACIONES INSTALADAS
# Como si fueran los "módulos" que componen tu aplicación
INSTALLED_APPS = [
    # Aplicaciones básicas de Django
    'django.contrib.admin',          # Panel de administración
    'django.contrib.auth',           # Sistema de autenticación
    'django.contrib.contenttypes',   # Manejo de tipos de contenido
    'django.contrib.sessions',       # Manejo de sesiones de usuario
    'django.contrib.messages',       # Sistema de mensajes
    'django.contrib.staticfiles',    # Manejo de archivos estáticos
    
    # Aplicaciones adicionales
    'corsheaders',                   # Permite la comunicación entre frontend y backend
    'rest_framework',                # Herramientas para crear API
    'tasks'                          # Tu aplicación de tareas
]

# MIDDLEWARE
# Son como "filtros" que procesan cada solicitud web
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',           # Seguridad
    'django.contrib.sessions.middleware.SessionMiddleware',    # Manejo de sesiones
    'corsheaders.middleware.CorsMiddleware',                  # Comunicación con frontend
    'django.middleware.common.CommonMiddleware',              # Funciones comunes
    'django.middleware.csrf.CsrfViewMiddleware',              # Protección contra ataques
    'django.contrib.auth.middleware.AuthenticationMiddleware', # Autenticación
    'django.contrib.messages.middleware.MessageMiddleware',    # Mensajes
    'django.middleware.clickjacking.XFrameOptionsMiddleware',  # Seguridad adicional
]

# Configuración de URLs principales
ROOT_URLCONF = 'api.urls'

# Configuración de plantillas HTML
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Configuración del servidor web
WSGI_APPLICATION = 'api.wsgi.application'

# CONFIGURACIÓN DE LA BASE DE DATOS
# Usamos SQLite, una base de datos simple pero efectiva
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# VALIDACIÓN DE CONTRASEÑAS
# Reglas para asegurar que las contraseñas sean seguras
AUTH_PASSWORD_VALIDATORS = [
    # Verifica que la contraseña no sea similar al nombre de usuario
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    # Verifica longitud mínima
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    # Evita contraseñas comunes
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    # Evita contraseñas solo numéricas
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# CONFIGURACIÓN DE IDIOMA Y ZONA HORARIA
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# ARCHIVOS ESTÁTICOS
# Configuración para CSS, JavaScript, imágenes, etc.
STATIC_URL = '/static/'

# Tipo de campo para IDs automáticos
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CONFIGURACIÓN DE CORS
# Permite que el frontend se comunique con el backend
CORS_ALLOWED_ORIGINS = ['http://localhost:5173']
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_METHODS = True
CORS_ALLOW_ALL_ORIGINS = True

# Cabeceras permitidas en las solicitudes
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# CONFIGURACIÓN DE LA API REST
# Define cómo funciona la autenticación y los permisos
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# CONFIGURACIÓN DE JWT (JSON Web Tokens)
# Define cómo funcionan los tokens de autenticación
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),      # Token de acceso dura 1 día
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),     # Token de actualización dura 7 días
    'ROTATE_REFRESH_TOKENS': True,                   # Rota los tokens para mayor seguridad
    'AUTH_HEADER_TYPES': ('Bearer',),               # Tipo de autenticación
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}