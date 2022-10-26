const express = require('express');
const routes = express.Router()
const { getUser, getUserById, insertUser, updateUser, deleteUserById } = require('./operationsAdmin')
const { pool } = require('../config/connect')


routes.get('/administrador', (req, res) => {
    getAdmin(pool, req, result => {
        res.json(result)
    })
})

routes.get('/administrador/:id', (req, res) => {
    getAdminById(pool, req.params.id, result => {
        res.json(result)
    })
})

routes.post('/administrador/insert', (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body));
    insertAdmin(pool, body, result => {
        res.status(201)
        res.json({
            message: `new admin ${body.nombre} created`
        });
    })
})

routes.patch('/administrador/update/:id',(req, res) => {
    let body = JSON.parse(JSON.stringify(req.body));
    updateAdmin(pool,req.params.id,body,result => {
        res.json({
            message: 'admin updated'
        });
    })
})

routes.delete('/administrador/:id', (req, res) => {
    deleteAdminById(pool, req.params.id, result => {
        res.json({
            message: 'admin deleted'
        });
    })
})


module.exports = routes;