const express = require('express');
const routes = express.Router()
const { getPyme, getPymeById, insertPyme, updatePyme, deletePymeById } = require('./operationsPyme')
const { pool } = require('../config/connect')


routes.get('/pyme', (req, res) => {
    getPyme(pool, req, result => {
        res.json(result)
    })
})

routes.get('/pyme/:id', (req, res) => {
    getPymeById(pool, req.params.id, result => {
        res.json(result)
    })
})

routes.post('/pyme/insert', (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body));
    insertPyme(pool, body, result => {
        res.status(201)
        res.json({
            message: `new pyme ${body.razonSocial} created`
        });
    })
})

routes.patch('/pyme/update/:id',(req, res) => {
    let body = JSON.parse(JSON.stringify(req.body));
    updatePyme(pool,req.params.id,body,result => {
        res.json({
            message: 'pyme updated'
        });
    })
})

routes.delete('/pyme/:id', (req, res) => {
    deletePymeById(pool, req.params.id, result => {
        res.json({
            message: 'pyme deleted'
        });
    })
})


module.exports = routes;