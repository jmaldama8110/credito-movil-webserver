const cassandra = require('cassandra-driver');
const Client = cassandra.Client;
const Mapper = cassandra.mapping.Mapper;
const UnderscoreCqlToCamelCaseMappings = cassandra.mapping.UnderscoreCqlToCamelCaseMappings;

const ruta = require('path');
const bundleLocation = ruta.join(__dirname,'../bundle/secure-connect-conserva.zip');

const cliente = new Client({
    cloud: { secureConnectBundle: bundleLocation },
    credentials: { username: process.env.DATASTAX_USER, password: process.env.DATASTAX_USER_PASSWORD },
    keyspace: process.env.DATASTAX_KEYSPACE
});

const mapper = new Mapper(cliente, {
    models: {
        'Usuario': {
            tables:
                ['usuarios','usuario_credenciales','usuario_tokens'],
            keyspace: process.env.DATASTAX_KEYSPACE,
            columns: {
                'account_no': 'accountNo',
                'tokens': 'token'
              },
              mappings: new UnderscoreCqlToCamelCaseMappings()
        },
        'Credenciales': {
            tables:
                ['usuario_credenciales'],
            keyspace: process.env.DATASTAX_KEYSPACE
        },
        'Tokens': {
            tables:
                ['usuario_tokens'],
            keyspace: process.env.DATASTAX_KEYSPACE
        },
        'Prestamos': {
            tables:
                ['prestamos_cliente'],
            keyspace: process.env.DATASTAX_KEYSPACE
        },
        'PlanPagos': {
            tables:
                ['prestamo_planpagos'],
            keyspace: process.env.DATASTAX_KEYSPACE
        }

    }
});

module.exports = {
    cliente,
    mapper,
};