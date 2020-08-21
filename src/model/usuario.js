const { mapper } = require('../db/cassandra-db');

const usuarioMapper = mapper.forModel('Usuario');

module.exports = usuarioMapper;