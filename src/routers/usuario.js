
const { v4: uuidv4 } = require('uuid');
const authcass = require('../middleware/authcass')
const { usuarioMapper, generarTokenAcceso } = require('../model/usuario')
const bcrypt = require('bcryptjs')

const express = require('express')
const router = new express.Router()


router.get('/usuarios/yo', authcass, (req, res) => { // GET perfil del usuario
    res.send(req.user);
})

router.post('/usuarios', async (req, res) => {

    try {

        const newId = uuidv4();
        const token = generarTokenAcceso(newId)

        const {
            id = newId,
            apellido_materno = '',
            apellido_paterno = '',
            fecha_nacimiento = '1900-01-01',
            genero = 'F',
            nombre = '',
            email = '',
            password = '',
            numero_movil = '' } = req.body

        const encodedPass = await bcrypt.hash(password,8);
        const usuarioNuevo = {  id,
                                apellido_materno,
                                apellido_paterno,
                                fecha_nacimiento,
                                genero,
                                nombre,
                                email,
                                password: encodedPass,
                                numero_movil }

        
        await usuarioMapper.insert(usuarioNuevo);

        res.status(201).send({ usuarioNuevo, token })
    }
    
    catch (error) {

        res.status(400).send(error);
    }
});

module.exports = router;