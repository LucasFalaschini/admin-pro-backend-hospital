require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config.js');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// USUARIO: LucasFalas
// PASS: LFDBMONGO2020

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));





app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en puerto" + process.env.PORT);
});