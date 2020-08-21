const cassandra = require('cassandra-driver');
const Client = cassandra.Client;
const Mapper = cassandra.mapping.Mapper;

const cliente = new Client({
    cloud: { secureConnectBundle: '/Users/josemanuel/Desktop/node01/credito-movil-webserver/secure-connect-consandra.zip' },
    credentials: { username: process.env.DATASTAX_USER, password: process.env.DATASTAX_USER_PASSWORD }
});

const mapper = new Mapper(cliente, {
    models: {
        'Usuario': {
            tables:
                ['usuarios'],
            keyspace: 'pruebaks'
        }
    }
});

module.exports = {
    cliente,
    mapper,
};