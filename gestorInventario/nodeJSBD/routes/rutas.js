const express = require('express');
const user = require('../user.model');
const connection = require('../conexion');

const router = express.Router();
const  { body, param, validationResult } = require('express-validator');

router.get('/user', [] , (req, res) => {
    user.getAll(connection, (data => {
        res.json(data);
    }))
});

router.post('/user', [
    body('id_producto').not().isEmpty().isString(),
    body('nombre').not().isEmpty().isString(),
    body('descripcion').not().isEmpty().isString(),
    body('id_categoria').not().isEmpty().isString(),
    body('marca').not().isEmpty().isString(),
    body('precio_compra').not().isEmpty().isString(),
    body('precio_venta').not().isEmpty().isString(),    
    body('cantidad_stock').not().isEmpty().isString(),
    body('id_proveedor').not().isEmpty().isString(),
    body('fecha_ingreso').not().isEmpty().isString(),
    body('fecha_caducidad').not().isEmpty().isString(),
    body('codigo_barras').not().isEmpty().isString(),
], (req, res) => {
        console.log('Estoy en el API POST');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ success: false, err: JSON.stringify(errors)})     
            return;
        }
        let body = req.body;
        user.create(connection, body, (data) => {
            res.json(data);
        })

    });

// Endpoint para la búsqueda
router.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    const sql = 'SELECT * FROM productos WHERE nombre LIKE ? OR descripcion LIKE ?';
    connection.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ array: results });
    });
});


    module.exports = router;