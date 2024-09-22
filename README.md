# Forms APP

## Descripción
Forms APP es una aplicación web que permite gestionar formularios. El frontend está desarrollado en Angular y el backend está implementado en .NET.

## Tecnologías Utilizadas
- **Frontend**: Angular
- **Backend**: .NET
- **Estilo**: Bootstrap

## Características
- Crear, editar y eliminar formularios.
- Gestión de campos dentro de los formularios.
- Interfaz de usuario intuitiva y amigable.
- Modal para la creación y edición de formularios y campos.

## Instalación

### Requisitos
- Node.js
- .NET SDK

### Base de datos
- Ejecuta el script de creación SQL que se encuentra en la raiz del proyecto

### Configuración del backend
1. **Navega hasta la ruta del back**
2. **Restaura las dependencias del proyecto**
```console
dotnet restore
```

3. **Compila el proyecto**
```console
dotnet build
```
4. **Ejecuta el proyecto**
```console
dotnet run
```
La aplicación debería estar ahora ejecutándose en https://localhost:5001 o http://localhost:5000

### Configuración del Frontend
### Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- [Angular CLI](https://angular.io/cli) (puedes instalarlo globalmente usando `npm install -g @angular/cli`)

### Pasos para Ejecutar el Proyecto

1. **Navega hasta la ruta front**

2. **Instala las dependencias**
   ```bash
   npm install
   
3. **Ejecuta el proyecto**
   ```bash
   ng serve

## Capturas front
### Crear un formulario
![image](https://github.com/user-attachments/assets/cac6a459-1134-425f-be51-0d709ecad15c)
### Crear un input para el formulario
![image](https://github.com/user-attachments/assets/0e5d5194-564a-4f08-8554-d47d9039975b)
### Editar inputs
![image](https://github.com/user-attachments/assets/b64fe769-1c74-4070-afa2-be4d9a001467)
### Vista completa de un formulario con los botones para editar y eliminar, tanto el formulario, como cada uno de sus inputs
![image](https://github.com/user-attachments/assets/e8a79076-de04-42cc-b4d2-37a73945fde9)


