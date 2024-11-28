# Gestor de Tareas - Django y React

Este es un proyecto de gestión de tareas desarrollado con Django para el backend y React para el frontend.

## Requisitos previos

- Python 3.9
- Node.js 14.x
- Git

## Instalación

1. Clona este repositorio en tu máquina local:
   ```
   git clone https://github.com/Santalexx/Gestor-Tareas-Django-React.git
   ```

2. Navega hasta el directorio del proyecto:
   ```
   cd gestor-tareas
   ```

### Backend (Django)

1. Crea un entorno virtual y actívalo:
   - En Windows:
     ```
     python -m venv env
     env\Scripts\activate
     ```
   - En macOS/Linux:
     ```
     python -m venv env
     source env/bin/activate
     ```

2. Instala las dependencias de Django:
   ```
   pip install -r requirements.txt
   ```

3. Realiza las migraciones de la base de datos:
   ```
   python manage.py migrate
   ```

### Frontend (React)

1. Navega hasta el directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias de React:
   ```
   npm install
   ```

## Ejecución

1. Inicia el servidor de desarrollo de Django:
   ```
   cd ..
   python manage.py runserver
   ```

2. En otra terminal, inicia el servidor de desarrollo de React:
   ```
   cd frontend
   npm run dev
   ```

3. Abre un navegador web y ve a la URL: `http://localhost:5173`

¡Listo! Ahora deberías poder ver y utilizar la aplicación Gestor de Tareas en tu entorno local.
