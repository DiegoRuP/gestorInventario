const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./conexion');
const misrutas = require('./routes/rutas');

const app = express();
const port = 3000;

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

// Ruta para obtener los datos de la tabla productos
app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (error, results, fields) => {
    if (error) {
      console.error('Error en la consulta:', error);
      res.status(500).send('Error en la consulta');
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor y conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});
