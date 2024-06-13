const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./conexion');
const routes = require('./routes/rutas');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', routes); 

// Iniciar servidor y conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack); 
    return;
  }
  console.log('Conexión a la base de datos exitosa'); 

  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`); 
  });
});

module.exports = app;
