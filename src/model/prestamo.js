const { mapper } = require('../db/cassandra-db');

const prestamoMapper = mapper.forModel('Prestamos');
const planpagosMapper = mapper.forModel('PlanPagos');
const clienteMovs = mapper.forModel('Movimientos');


module.exports = {
    prestamoMapper,
    planpagosMapper,
    clienteMovs
}