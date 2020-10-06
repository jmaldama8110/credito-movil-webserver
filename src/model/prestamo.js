const { mapper } = require('../db/cassandra-db');

const prestamoMapper = mapper.forModel('Prestamos');
const planpagosMapper = mapper.forModel('PlanPagos');


module.exports = {
    prestamoMapper,
    planpagosMapper
}