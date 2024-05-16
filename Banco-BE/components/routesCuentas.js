const express = require('express');
const routes = express.Router()
const { getCuentas, getMaxNumCta, getMaxCbu, getMaxIdCli, getCuentaById, getCuentaByCbu, insertCuenta, updateCuenta, deleteCuentaById } = require('./operationsCuentas')
const { pool } = require('../config/connect')


routes.get('/cuentas', (req, res) => {
    getCuentas(pool, req, result => {
        res.json(result)
    })
})

routes.get('/maxCli', (req, res) => {
    getMaxNumCta(pool, req, result => {
        res.json(result)
    })
})

routes.get('/maxCbu', (req, res) => {
    getMaxCbu(pool, req, result => {
        res.json(result)
    })
})

routes.get('/maxIdCu', (req, res) => {
    getMaxIdCli(pool, req, result => {
        res.json(result)
    })
})

routes.get('/cuenta/:id', (req, res) => {
    let id = req.params.id
    getCuentaById(pool, id, result => {
        res.json(result)
    })
})

routes.get('/cuentaCbu/:cbu', (req, res) => {
    let cbu = req.params.cbu
    getCuentaByCbu(pool, cbu, result => {
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

