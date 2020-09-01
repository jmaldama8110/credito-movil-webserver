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

const generarTokenAcceso = (id) => {
    
    const jwt_secret_key = process.env.JWT_SECRET_KEY
    const token  = jwt.sign(    {   id : id.toString() }, jwt_secret_key)

    return token

}

const findUsuarioPorCredenciales = ( busqueda , password  ) => {

    const usuario = usuarioMapper.find({})

    return usuario;
}

module.exports = {
    usuarioMapper,
    generarTokenAcceso
};