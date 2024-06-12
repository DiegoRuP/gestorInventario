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
    body('idUser').not().isEmpty().isString(),
    body('name').not().isEmpty().isString(),
    body('lastname').not().isEmpty().isString(),
    body('contact').not().isEmpty().isString(),
    body('cellphone').not().isEmpty().isString(),
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

    module.exports = router;