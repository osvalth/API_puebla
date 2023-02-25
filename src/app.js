const express = require('express');
const path = require('path')
const cors = require('cors');

const { appConfig } = require('./config')
const { host, port } = appConfig;

const routesAPI = require('./routes/users');

const app = express();

// Settings
app.set('port', process.env.PORT || port );

// Middlewares
app.use(express.json());
app.use(cors())// para evitar conflicto de CORS en el navegador (en produccion no sirve)

//Routes
app.use(routesAPI);

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`SERVER UP RUNNING ON PORT ${app.get('port')}`)
    console.log(`${host}:${app.get('port')}`)
});