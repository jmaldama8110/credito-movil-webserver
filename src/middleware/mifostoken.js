
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const axios = require('axios');
const diffFechaInicioFin = require('../utils/diferenciaFechas');


const fxObtenerTokenMifos = async () => {

    //Obtiene el token a emplear en el server
    const res = await axios.post(`${process.env.MIFOS_BASEURL}/api/v1/account/login`, {
        username: process.env.MIFOS_USERNAME,
        password: process.env.MIFOS_PASSWORD
    });
    console.log('...OK ->Api devulve token de mifos...')
    return { token: res.data.token, exp: res.data.expiration };

}

const fxInitMemoryDB = async () => {

    const data = await fxObtenerTokenMifos();

    db.serialize(() => {
        db.run("CREATE TABLE mf (data TEXT)");

        const stmt = db.prepare("INSERT INTO mf VALUES (?)");
        stmt.run(JSON.stringify(data));
        stmt.finalize();
        console.log('...OK-> Creando DB SQLite en memoria...')
    });


}

const fxUpdateMemoryDB = async () => {

    db.get("SELECT data FROM mf", async (err, row) => {
        console.log('...OK-> Comprobando validez del token actual...')
        const data = JSON.parse(row.data);
        const fechaInicio = Date.now();
        const fechaFin = data.exp;
        const duracionToken = diffFechaInicioFin(fechaInicio, fechaFin, 'hours');
        console.log('Tiempo de vida del token generado...', duracionToken);

        if (duracionToken < 0) {
            const data2 = await fxObtenerTokenMifos();
            const params = [JSON.stringify(data2)];
            db.run("UPDATE mf SET data=?", params, (error) => {
                if (error) {
                    console.log(error);
                }
            })
        }


    })
}

const fxGetCurrentToken =  async (callback) => {
    db.get("SELECT data FROM mf", (err, row) => {
        return callback(row.data);
    });
}


module.exports = {
    fxInitMemoryDB,
    fxUpdateMemoryDB,
    fxGetCurrentToken
}