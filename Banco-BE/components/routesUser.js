const express = require('express');
const routes = express.Router()
const { getUser, getUserById, insertUser, updateUser, deleteUserById } = require('./operationsUser')
const { pool } = require('../config/connect')


routes.get('/usuario', (req, res) => {
    console.log("llegue");
    getUser(pool, req, result => {
        res.json(result)
    })
})

routes.get('/usuario/:id', (req, res) => {
    getUserById(pool, req.params.id, result => {
        res.json(result)
    })
})

routes.post('/usuario/insert', (req, res) => {
    let body = JSON.parse(JSON.stringify(req.body));
    insertUser(pool, body, result => {
        res.status(201)
        res.json({
            message: `new user ${body.user} created`
        });
    })
})

routes.patch('/usuario/update/:id',(req, res) => {
    let body = JSON.parse(JSON.stringify(req.body));
    updateUser(pool,req.params.id,body,result => {
        res.json({
            message: 'user updated'
        });
    })
})

routes.delete('/usuario/:id', (req, res) => {
    deleteUserById(pool, req.params.id, result => {
        res.json({
            message: 'user deleted'
        });
    })
})


module.exports = routes;
