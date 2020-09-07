const jwt = require('jsonwebtoken')
const { usuarioMapper, tokensMapper } = require('../model/usuario')

const authcass = async (req, res, next) => {

    try {

        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const usuarioId = decoded.usuarioIdCoded;

        user = await usuarioMapper.get({ usuarioId });
        tokenValido = await tokensMapper.get({ tokens: token,usuario_id:usuarioId})

        if (!(user && tokenValido) ) {
            throw new Error();
        }
        req.currentToken = token;
        req.user = user;
        next();

    }
    catch (error) {
        res.status(401).send({ error: 'No autenticado...' })
    }

}

module.exports = authcass
