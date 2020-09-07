const cassandra = require('cassandra-driver');
const Client = cassandra.Client;
const Mapper = cassandra.mapping.Mapper;
const UnderscoreCqlToCamelCaseMappings = cassandra.mapping.UnderscoreCqlToCamelCaseMappings;

const ruta = require('path');
const bundleLocation = ruta.join(__dirname,'../bundle/secure-connect-consandra.zip');

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
                'usuario_id': 'usuarioId',
                'numero_movil': 'numeroMovil',
                'tokens': 'token'
              },
              mappings: new UnderscoreCqlToCamelCaseMappings()
        },
        'Tokens': {
            tables:
                ['usuario_tokens'],
            keyspace: process.env.DATASTAX_KEYSPACE
        }
    }
});

module.exports = {
    cliente,
    mapper,
};