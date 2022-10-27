const express = require('express');
const routes = express.Router()
const { getClient, getClientById, insertClient, updateClient, deleteClientById } = require('./operationsCliente')
const { pool } = require('../config/connect')


routes.get('/cliente', (req, res) => {
    getClient(pool, req, result => {
        res.json(result)
    })
})

routes.get('/cliente/:id', (req, res) => {
    getClientById(pool, req.params.id, result => {
        res.json(result)
    })
})

routes.post('/cliente/insert', (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body));
    insertClient(pool, body, result => {
        res.status(201)
        res.json({
            message: `new client ${body.Id} created`
        });
    })
})

routes.patch('/cliente/update/:id',(req, res) => {
    let body = JSON.parse(JSON.stringify(req.body));
    updateClient(pool,req.params.id,body,result => {
        res.json({
            message: 'cliente updated'
        });
    })
})

routes.delete('/cliente/:id', (req, res) => {
    deleteClientById(pool, req.params.id, result => {
        res.json({
            message: 'cliente deleted'
        });
    })
})


module.exports = routes;
