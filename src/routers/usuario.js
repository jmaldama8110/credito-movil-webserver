
const { v4: uuidv4 } = require('uuid');
const authcass = require('../middleware/authcass')
const { usuarioMapper, generarTokenAcceso } = require('../model/usuario')
const bcrypt = require('bcryptjs')

const express = require('express')
const router = new express.Router()

router.get('/usuarios/yo', authcass, (req, res) => { // GET perfil del usuario
    res.send(req.user);
})

// CREAR usuario
router.post('/usuarios', async (req, res) => {

    try {

        const newId = uuidv4();
        const token = generarTokenAcceso(newId)

        //// VALOR por Default /////////////
        const {
            usuario_id = newId,
            apellido_materno = '',
            apellido_paterno = '',
            nombre = '',
            password = '',
            numero_movil = '' } = req.body
    
        const encodedPass = await bcrypt.hash(password,8);
        const usuarioNuevo = {  usuario_id,
                                apellido_materno,
                                apellido_paterno,
                                nombre,
                                password: encodedPass,
                                numero_movil,
                                tokens: token }
        ////////////////////////////////////////
        
        await usuarioMapper.insert(usuarioNuevo);

        res.status(201).send({ usuarioNuevo, token })
    }
    
    catch (error) {

        res.status(400).send(error);
    }
});

module.exports = router;