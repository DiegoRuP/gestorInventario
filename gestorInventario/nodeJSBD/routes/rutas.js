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

module.exports = router;
