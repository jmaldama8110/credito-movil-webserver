const { mapper } = require('../db/cassandra-db');

const prestamoMapper = mapper.forModel('Prestamos');



module.exports = {
    prestamoMapper
}



