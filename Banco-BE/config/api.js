const apiV1 = require('express')();


const userRouterIndiv = require('../components/routesIndividuo');
const userRouterUser = require('../components/routesUser');
const userRouterCuenta = require('../components/routesCuentas');
const userRouterCliente = require('../components/routesCliente');


apiV1.use('/', userRouterIndiv, userRouterUser, userRouterCuenta, userRouterCliente);

module.exports= {
    v1:apiV1
}

