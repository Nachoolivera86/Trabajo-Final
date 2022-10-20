const express = require('express');
const routes = express.Router()
const { getCuentas, getCuentaById, insertCuenta, updateCuenta, deleteCuentaById } = require('./operationsCuentas')
const { pool } = require('../config/connect')


routes.get('/cuentas', (req, res) => {
    getCuentas(pool, req, result => {
        res.json(result)
    })
})

routes.get('/cuenta/:id', (req, res) => {
    let id = req.params.id
    getCuentaById(pool, id, result => {
        res.json(result)
    })
})

routes.post('/cuenta/insert', (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body));
    insertCuenta(pool, body, result => {
        res.status(201)
        res.json({
            message: 'new cuenta created'
        });
    })
})

routes.patch('/cuenta/update/:id',(req, res) => {
    let body = JSON.parse(JSON.stringify(req.body));
    updateCuenta(pool,req.params.id,body,result => {
        res.json({
            message: 'cuenta updated'
        });
    })
})

routes.delete('/cuenta/:id', (req, res) => {
    deleteCuentaById(pool, req.params.id, result => {
        res.json({
            message: 'cuenta deleted'
        });
    })
})


module.exports = routes;

