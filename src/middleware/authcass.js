//const jwt = require('jsonwebtoken')
const usuarioMapper = require('../model/usuario')

// -> agregar columna en pruebaks/usuarios para guardar el Array de tokens = HECHO
// -> crear la funcion de crear usuario con correo y contraseña y generar token con JWT
// -> Usar TTL para el token?
// -> Con el token enviando desde el request, buscar si existe dentro del array y que coincida con el usuarios buscado
// -> Corregir authcass.js para buscar Usuario con base en el token enviado en la peticion

const authcass = async (req, res, next) => {

    try {

        const token = req.header('Authorization').replace('Bearer ','')
        const user = await usuarioMapper.get({ id: 'c867ffe0-e34c-11ea-ba49-938e8fb32bbd' });

        if (!user) {
            throw new Error();
        }
//        req.currentToken = 'token'
        req.user = user
        next()
    }
    catch (error) {
        res.status(401).send({ error: 'No autenticado...' })
    }


}

module.exports = authcass


// const auth = async (req, res, next ) => {

//     try{

//         const token = req.header('Authorization').replace('Bearer ','')
//         const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
//         const user = await User.findOne( { _id: decoded._id, 'tokens.token': token  } )

//         if( !user ){
//             throw new Error()
//         }

//         req.currentToken = token
//         req.user = user
//         next()

//     }catch(error) {
//         res.status(401).send( {error: 'Not authenticated...'} )

//     }

// }

// module.exports = auth