El backend de este proyecto fue desarrollado con Node.js, Express y Sequelize, 
aprovechando las siguientes tecnologías complementarias para garantizar seguridad, 
configuración flexible y manejo de autenticación:

La conexion con BD -> PostgreSQL
URL BD Publicada en Render
https://backendproyecto-tto5.onrender.com/

EndPoints ==>
/auth/login -> POST,
/auth/register -> POST,


Requiere de Authorization ==>
/auth/me -> GET,
/api/tasks -> POST,
/api/tasks -> GET,
api/tasks/2 -> GET,
/api/tasks/3 ->PUT,
/api/tasks?search=prueba -> GET
