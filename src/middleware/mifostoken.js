
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const axios = require('axios');

const fxObtenerTokenMifos = async () => {

    //Obtiene el token a emplear en el server
    const res = await axios.post('https://fincoredemo.dnsalias.net/api/v1/account/login', {
        username: process.env.MIFOS_USERNAME,
        password: process.env.MIFOS_PASSWORD
    });

    return { token:res.data.token, exp:res.data.expiration };

}

const fxInitMemoryDB = async () => {

    const data = await fxObtenerTokenMifos();

        db.serialize(function () {
            db.run("CREATE TABLE mf (data TEXT)");

            const stmt = db.prepare("INSERT INTO mf VALUES (?)");
            stmt.run(JSON.stringify(data));
            stmt.finalize();
        });

    //    db.close();

}

const currentMifosToken =  () =>{

    db.each("SELECT data FROM mf", function (err, row) {
        return row.data;
    });

    
}

module.exports = {
    currentMifosToken,
    fxInitMemoryDB,
    db
}