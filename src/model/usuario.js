const { mapper } = require('../db/cassandra-db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usuarioMapper = mapper.forModel('Usuario');

const generarTokenAcceso = (id) => {
    
    const jwt_secret_key = process.env.JWT_SECRET_KEY
    const token  = jwt.sign(    {   id : id.toString() }, jwt_secret_key)

    return token

}


module.exports = {
    usuarioMapper,
    generarTokenAcceso
};