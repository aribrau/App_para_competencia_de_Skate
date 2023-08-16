Proyecto Sprint Módulo 8 - Chamuteros del Code
// abrir con markdown preview (ctrl+k, v)

tareas:

-. hacer el CRUD de skater: <del>create</del>, <del>get all</del>, <del>update</del>, <del>delete</del>
-. hacer la API rest (HATEOAS)
-. hacer middlewares 
-. servir la funcionalidad para subir archivos con file-upload
-. implementar seguridad con JWT
-. servir contenido dinámico con handlebars


Indicaciones:

1. El sistema debe permitir registrar nuevos participantes.
2. Se debe crear una vista para que los participantes puedan iniciar sesión con su correo y contraseña.
3. Luego de iniciar la sesión, los participantes deberán poder modificar sus datos, exceptuando el correoelectrónico y su foto. Esta vista debe estar protegida con JWT y los datos que se utilicen en la planilla deben ser extraídos del token.
4. La vista correspondiente a la ruta raíz debe mostrar todos los participantes registrados y su estado de
revisión.
5. La vista del administrador debe mostrar los participantes registrados y permitir aprobarlos para cambiar su estado.

Requerimientos:

1. Crear una API REST con Express (3pts).
2. Servir contenido dinámico con express-handlebars (3pts).
3. Ofrecer la funcionalidad Upload File con express file-upload(2pts).
4. Implementar Seguridad y restricción de recursos o contenido con JWT(2pts.)


----- actualizado 04-08-2023 20:56 ------