const express = require('express');
const routes = express.Router()
const { getIndividuo, getIndividuoById, insertIndividuo, updateIndividuo, deleteIndividuoById } = require('./operations')
const { pool } = require('../config/connect')


routes.get('/individuo', (req, res) => {
    getIndividuo(pool, req, result => {
        res.json(result)
    })
})

routes.get('/individuo/:id', (req, res) => {
    getIndividuoById(pool, req.params.id, result => {
        res.json(result)
    })
})

routes.post('/individuo/insert', (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body));
    insertIndividuo(pool, body, result => {
        res.status(201)
        res.json({
            message: 'new individuo created'
        });
    })
})

routes.patch('/individuo/:id',(req, res) => {
    let body = JSON.parse(JSON.stringify(req.body));
    updateIndividuo(pool,req.params.id,body,result => {
        res.json({
            message: 'individuo updated'
        });
    })
})

routes.delete('/individuo/:id', (req, res) => {
    deleteIndividuoById(pool, req.params.id, result => {
        res.json({
            message: 'individuo deleted'
        });
    })
})


module.exports = routes;

