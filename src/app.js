const express = require('express')
const cron = require('node-cron');

const { cliente } = require('./db/cassandra-db')
const usuarioRouter = require('./routers/usuario')
const {fxInitMemoryDB,db, currentMifosToken } = require('./middleware/mifostoken');

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


db.each("SELECT data FROM mf", function (err, row) {
    console.log( row.data.expiration);
});

// cron.schedule('* * * * * *', () => {

// console.log('hola');

// });



module.exports = app