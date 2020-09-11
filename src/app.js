const express = require('express')
const axios = require('axios');

const { cliente } = require('./db/cassandra-db')
const usuarioRouter = require('./routers/usuario')

const app = express()

app.use(express.json())
app.use(usuarioRouter)

const fxInicializar = async () => {

    try {
        await cliente.connect();

        // Execute a query
        const rs = await cliente.execute('SELECT * FROM system.local');
        console.log(`...Cluster activo: ${rs.first()['cluster_name']}`);
    }
    catch (error) {
        console.log(error);
    }
}
const fxObtenerTokenMifos = async () => {
    
    //Obtiene el token a emplear en el server
    await axios.post('https://fincoredemo.dnsalias.net/api/v1/account/login', {
        username: process.env.MIFOS_USERNAME,
        password: process.env.MIFOS_PASSWORD
    }).then(async (respuesta) => {

        console.log('Obtain access to core banking system...DONE')
    }).catch((err) => {

    })

}

fxInicializar();
//fxObtenerTokenMifos();

module.exports = app