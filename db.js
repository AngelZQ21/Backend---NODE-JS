const mysql = require('mysql2');

const conexion = mysql.createPool({
    host: 'localhost',    // Cambia esto si tu MySQL está en otro host
    user: 'root',         // Tu usuario de MySQL
    password: '123456',  // Tu contraseña de MySQL
    database: 'auth_db' // El nombre de tu base de datos
});

module.exports = conexion.promise();