const express = require('express')
const cron = require('node-cron');

const { cliente } = require('./db/cassandra-db')
const usuarioRouter = require('./routers/usuario')
const {fxInitMemoryDB,fxUpdateMemoryDB } = require('./middleware/mifostoken');

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

fxInicializar();

fxInitMemoryDB();


cron.schedule('00 00 * * *', () => {
    fxUpdateMemoryDB();
});


module.exports = app