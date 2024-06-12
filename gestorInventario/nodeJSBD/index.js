const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./conexion');
const misrutas = require('./routes/rutas');

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configurar bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Usar rutas
app.use('/', misrutas);

// Conexión a la base de datos
connection.connect((err, res) => {
    if (err) {
        console.log(err);
        console.log('Error al conectar a la base de datos');
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

// Iniciar el servidor
app.listen(3000, (err, res) => { 
    if (err) {
        console.log('Error al iniciar el servidor');
        return;
    }
    console.log('Servidor iniciado en http://localhost:3000');
});
