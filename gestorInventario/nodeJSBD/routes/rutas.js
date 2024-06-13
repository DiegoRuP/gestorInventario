const express = require('express');
const user = require('../user.model');
const connection = require('../conexion');
const { body, validationResult } = require('express-validator');

const router = express.Router();



// Ruta para obtener todos los productos
router.get('/productos', (req, res) => {
    user.getAll(connection, (data) => {
        res.json(data);
    });
});

// Ruta para insertar un nuevo producto
router.post('/productos', [
    body('id_producto').not().isEmpty().isString(),
    body('nombre').not().isEmpty().isString(),
    body('descripcion').not().isEmpty().isString(),
    body('id_categoria').not().isEmpty().isString(),
    body('marca').not().isEmpty().isString(),
    body('precio_compra').not().isEmpty().isString(),
    body('precio_venta').not().isEmpty().isString(),
    body('cantidad_stock').not().isEmpty().isString(),
    body('unidad_medida').not().isEmpty().isString(),
    body('id_proveedor').not().isEmpty().isString(),
    body('fecha_ingreso').not().isEmpty().isString(),
    body('fecha_caducidad').not().isEmpty().isString(),
    body('codigo_barras').not().isEmpty().isString(),
], (req, res) => {
    console.log('Estoy en el API POST');
    console.log('Datos recibidos del formulario Angular:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    let body = req.body;
    user.create(connection, body, (data) => {
        res.json(data);
    });
});


router.delete('/productos/:id', (req, res) => {
    const id_producto = req.params.id;
    user.delete(connection, id_producto, (data) => {
        res.json(data);
    });
});

// Nueva ruta para generar el reporte de productos agotados
router.get('/generarReporte', (req, res) => {
    const query = 'SELECT * FROM productos WHERE cantidad_stock < 5';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta: ', error);
            res.status(500).json({ success: false, message: 'Error al obtener productos' });
        } else {
            res.json({ success: true, data: results });
        }
    });
});

// Nueva ruta para generar el reporte de productos agotados
router.get('/mostrar', (req, res) => {
    const query = 'SELECT * FROM productos';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta: ', error);
            res.status(500).json({ success: false, message: 'Error al obtener productos' });
        } else {
            res.json({ success: true, data: results });
        }
    });
});

router.put('/productos/:id', [
    body('nombre').isString().withMessage('Nombre debe ser una cadena de texto'),
    body('descripcion').isString().withMessage('Descripción debe ser una cadena de texto'),
    body('id_categoria').isInt().withMessage('ID Categoría debe ser un número entero'),
    body('marca').isString().withMessage('Marca debe ser una cadena de texto'),
    body('precio_compra').isFloat().withMessage('Precio Compra debe ser un número decimal'),
    body('precio_venta').isFloat().withMessage('Precio Venta debe ser un número decimal'),
    body('cantidad_stock').isInt().withMessage('Stocks debe ser un número entero'),
    body('unidad_medida').isString().withMessage('Unidad Medida debe ser una cadena de texto'),
    body('id_proveedor').isInt().withMessage('ID Proveedor debe ser un número entero'),
    body('fecha_ingreso').isISO8601().toDate().withMessage('Fecha Ingreso debe ser una fecha válida'),
    body('fecha_caducidad').isISO8601().toDate().withMessage('Fecha Caducidad debe ser una fecha válida'),
    body('codigo_barras').isString().withMessage('Código Barras debe ser una cadena de texto'),
  ], (req, res) => {
    const id_producto = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
  
    const body = req.body;
    user.update(connection, id_producto, body, (data) => {
      if (!data.success) {
        return res.status(500).json({ success: false, error: data.error });
      }
      res.json(data);
    });
  });
  


module.exports = router;
