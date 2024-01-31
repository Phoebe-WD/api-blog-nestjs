# Documentación del Proyecto Final: Blog API

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

## Introducción

Este es un proyecto final del bootcamp de JavaScript en el Backend de Código Facilito. Esta API permite la gestión de usuarios, posts y autenticación mediante endpoints RESTful.

## Tecnologías Utilizadas

- NestJs
- MongoDB
- JwT
- Passport

## Instalación y Configuración

1. Clona el repositorio desde [GitHub](https://github.com/Phoebe-WD/api-blog-nestjs).
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno en un archivo `.env`.

## Endpoints

### Autenticación

- **`POST /register`**
  - Registro de nuevos usuarios.
  - Body:
    ```json
    {
      "email": "correo_electrónico",
      "password": "contraseña",
      "role": "admin || user",
      "img": "url_img",
      "username": "nombre_de_usuario",
    }
    ```
- **`POST /auth/login`**
  - Inicio de sesión para usuarios.
  - Body:
    ```json
    {
      "email": "correo_electrónico",
      "password": "contraseña"
    }
    ```

### Users

- **`GET /users`**
  - Listado de usuarios.
- **`GET /users/{id}`**
  - Obtener detalles de un usuario específico.
- **`PUT /users/{id}`**
  - Actualizar un usuario específico.
- **`DELETE /users/{id}`**
  - Eliminar un usuario (solo administradores).

### Posts

- **`POST /posts`**
  - Crear un nuevo post (solo usuarios registrados).
  - Body:
    ```json
    {
      "title": "Título del Post",
      "contentBody": "Contenido del Post",
      "img": "Url de la imagen",
    }
    ```
- **`GET /posts`**
  - Listado de todos los posts.
  - Query Params:
    - `page` (default: 1): Página de resultados.
    - `limit` (default: 10): Cantidad de resultados.
- **`GET /posts/{id}`**
  - Ver detalles de un post específico.
- **`PUT /posts/{id}`**
  - Actualizar un post.
- **`DELETE /posts/{id}`**
  - Eliminar un post.
- **`GET /posts/user/{userId}`**
  - Ver todos los posts de un usuario específico.

### Búsqueda y Filtrado

- **`GET /posts/search`**
  - Buscar posts por título & contenido del post.
  - Query Params:
    - `query`: Término de búsqueda.
    - `page` (default: 1): Página de resultados.
    - `limit` (default: 10): Cantidad de resultados.
- **`GET /posts/filter`**
  - Filtrar posts por título o autor.
  - Query Params:
    - `author`: Autor para filtrar.
    - `title`: Título para filtrar.

### Administración

- **`GET /admin/users`**
  - Obtener todos los usuarios (solo administradores).
- **`DELETE /admin/users/{id}`**
  - Eliminar usuarios (solo administradores).
- **`GET /admin/posts`**
  - Obtener todos los posts (solo administradores).

## Autenticación y Autorización

- Todos los endpoints protegidos requieren autenticación mediante un token.
- Las rutas administrativas requieren que el usuario sea un administrador.


## Colaboradores ✨

Gracias a estas maravillosas personas: ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

<table>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/68600680?v=4" width="100px;" alt=""/><br /><sub><b>Phoebe Sttefi Wilckens Díaz</b></sub></a><br /><a href="https://github.com/Phoebe-WD/api-blog-nestjs" title="Documentation">📖</td>
  </tr>
</table>

<!-- DOCS-IGNORE:end -->