const { mapper } = require('../db/cassandra-db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// USUARIOS
// usuario_id | apellido_materno | apellido_paterno | nombre
// ------------+------------------+------------------+--------

//USUARIO_CREDENCIALES
//  numero_movil | password | usuario_id
// --------------+----------+------------

//USUARIO_TOKENS
//  tokens | numero_movil | usuario_id
// --------+--------------+------------

const usuarioMapper = mapper.forModel('Usuario');
const tokensMapper = mapper.forModel('Tokens');

const generarTokenAcceso = (id) => {

    const jwt_secret_key = process.env.JWT_SECRET_KEY
    const token = jwt.sign({ usuarioIdCoded: id }, jwt_secret_key)

    return token

}


const findUsuarioPorCredenciales = async (numero_movil, password) => {

    const usuario = await usuarioMapper.get({ numero_movil })

    if (!usuario) {
        throw new Error('No fue posible loguearse...')
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
        throw new Error('No fue posible loguearse...')
    }

    return usuario;
}

const findUsuarioPorMovil = async (numeroMovil) => {

    const user = await usuarioMapper.get({ numeroMovil })

    return user;

}


module.exports = {
    usuarioMapper,
    tokensMapper,
    findUsuarioPorMovil,
    findUsuarioPorCredenciales,
    generarTokenAcceso
};