
const { v4: uuidv4 } = require('uuid');

const authcass = require('../middleware/authcass')
const axios = require('axios');

const { usuarioMapper, tokensMapper,
    findUsuarioPorMovil,
    findUsuarioPorCredenciales,
    generarTokenAcceso } = require('../model/usuario')

const { cliente } = require('../db/cassandra-db')

const bcrypt = require('bcryptjs')

const express = require('express');
const router = new express.Router()

router.get('/usuarios/yo', authcass, async (req, res) => { // GET perfil del usuario
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
            creado_el = Date.now(),
            numero_movil = '' } = req.body

        const encodedPass = await bcrypt.hash(password, 8);
        const usuarioNuevo = {
            usuario_id,
            apellido_materno,
            apellido_paterno,
            nombre,
            password: encodedPass,
            creado_el,
            numero_movil,
            tokens: token
        }

        const usuarioBusqueda = await findUsuarioPorMovil(numero_movil);

        if (!usuarioBusqueda) {
            await usuarioMapper.insert(usuarioNuevo);
            res.status(201).send({ usuarioNuevo, token })
        }
        else {
            res.status(400).send('Peticion de registro no valida...')
        }
    }

    catch (error) {

        res.status(400).send(error);
    }
});

//Usuario LOGIN
router.post('/usuarios/login', async (req, res) => { // Enviar peticion Login, generar un nuevo token

    try {

        const user = await findUsuarioPorCredenciales(req.body.numero_movil, req.body.password)
        const token = generarTokenAcceso(user.usuarioId)

        await tokensMapper.insert({
            numero_movil: user.numeroMovil,
            usuario_id: user.usuarioId,
            tokens: token,
            creado_el: Date.now()
        });



        res.send({ user: user, token })

    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/usuarios/soycliente', authcass, async (req, res) => {

    //Obtiene el token a emplear en el server
    await axios.post('https://fincoredemo.dnsalias.net/api/v1/account/login', {
        username: process.env.MIFOS_USERNAME,
        password: process.env.MIFOS_PASSWORD
    }).then(async (respuesta) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${respuesta.data.token}`;
        await axios.get('https://fincoredemo.dnsalias.net/api/v1/clients?office_id=0&search=000001100')
            .then((response) => {
                res.send(response.data);
            }).catch((err) => console.log(err))
    }).catch((err) => {
        res.send(err);
    })

})

// Usuario LOGOUT
router.post('/usuarios/logout', authcass, async (req, res) => {

    try {
        await tokensMapper.remove({ usuario_id: req.user.usuarioId, tokens: req.currentToken })
        res.send();
    }
    catch (error) {
        res.status(500).send()
    }

})

router.post('/usuarios/logoutall', authcass, async (req, res) => {

    // Use query markers (?) and parameters
    const query = 'DELETE FROM usuario_tokens WHERE usuario_id=? ';
    const params = [req.user.usuarioId];

    // Set the prepare flag in the query options
    await cliente.execute(query, params, { prepare: true });

    res.send();
})



module.exports = router;

// const multer = require('multer') // parar cargar imagenes
// const sharp = require('sharp')

// const { sendWelcomeEmail, sendGoodbyEmail } = require('../emails/account')
// const sendWelcomeSMS = require('../sms/sendsms')

// router.get('/users/me', auth, async (req, res) => { // GET perfil del usuario
//     res.send(req.user)

// })
// router.patch('/users/me', auth, async (req, res) => { // PATCH (actualiza) usuario
//     const actualizaciones = Object.keys(req.body)
//     const camposPermitidos = ['name', 'email', 'password', 'age', 'phone']
//     if (!isComparaArreglosJSON(actualizaciones, camposPermitidos)) {
//         return res.status(400).send({ error: 'JSON incluye campos no validos...' })
//     }
//     try {
//         actualizaciones.forEach((valor) => req.user[valor] = req.body[valor])
//         await req.user.save()
//         res.status(200).send(req.user)
//     }
//     catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/users/me', auth, async (req, res) => { // elimina mi usuario (quien esta logeado)

//     try {

//         await req.user.remove()

//         sendGoodbyEmail(req.user.email, req.user.name)

//         return res.send(req.user)

//     } catch (e) {
//         res.status(400).send(e)
//     }

// })

// router.post('/users', async (req, res) => { // crea un nuevo usuario

//     const user = new User(req.body)

//     try {

//         const token = await user.generateAuthToken()

//         await user.save()
//         sendWelcomeEmail(user.email, user.name)

//         if (user.phone) {
//             const phone = '+521' + user.phone // only MEX numubers
//             const body = `${user.name} bienvenido a Taskman!`
//             sendWelcomeSMS(phone, body)
//         }

//         res.status(201).send({ user, token })
//     }
//     catch (err) {
//         res.status(400).send(err)
//     }

// })

// router.post('/users/login', async (req, res) => { // Enviar peticion Login, generar un nuevo token

//     try {

//         const user = await User.findUserByCredentials(req.body.email, req.body.password)

//         const token = await user.generateAuthToken()

//         res.send({ user: user, token })

//     } catch (error) {
//         res.status(400).send(error)
//     }

// })

// router.post('/users/logout', auth, async (req, res) => { // Enviar peticion de Logout, elimina el token actual

//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token !== req.currentToken
//         })

//         await req.user.save()
//         res.send()

//     } catch (error) {
//         res.status(500).send()
//     }

// })

// router.post('/users/logoutall', auth, async (req, res) => { // Envia peticion de Logout de todos los tokens generados, elimina todos los tokens

//     try {

//         req.user.tokens = []
//         await req.user.save()
//         res.send()

//     } catch (error) {
//         res.status(500).send()
//     }

// })


// const upload = multer({
//     //dest: 'avatars', commentado para evitar que envie el archivo sea enviado a la carpeta avatars
//     limits: {
//         fileSize: 1000000 // 1,0 megabytes
//     },
//     fileFilter(req, file, cb) { // cb -> callback function

//         if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { // Expresion regular-> checar regex101.com
//             return cb(new Error('Not a valid image.. use only PNG, JPEG, JPG'))
//         }

//         cb(undefined, true)
//         // cb( new Error('file type in not accepted') )
//         // cb( undefined, true )
//         // cb( undefined, false )
//     }
// })

// // POST actualizar imagen avater del usuario autenticado
// router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

//     req.user.avatar = buffer

//     await req.user.save()

//     res.send()

// }, (error, req, res, next) => {  // handle error while loading upload
//     res.status(400).send({ error: error.message })
// })


// // DELETE elminar el avatar del usuario autenticado
// router.delete('/users/me/avatar', auth, async (req, res) => {

//     req.user.avatar = undefined
//     await req.user.save()

//     res.send()
// })

// // GET obtener el avatar de cualquier usuario (sin estar logeado)
// router.get('/users/:id/avatar', async (req, res) => {

//     try {
//         const user = await User.findById(req.params.id)

//         if (!user || !user.avatar) {
//             throw new Error()
//         }

//         res.set('Content-Type', 'image/png') // respues en modo imagen desde el server
//         res.send(user.avatar) // send -> campo buffer

//     } catch (error) {
//         res.status(404).send()
//     }

// })

// const MessagingResponse = require('twilio').twiml.MessagingResponse

// router.post('/sms', (req, res) => {

//     const twiml = new MessagingResponse()

//     twiml.message('Codigo de acceso 103456 expira en 5 minutos')

//     res.set('Content-Type', 'text/xml')
//     res.send(twiml.toString())

// })

// const isComparaArreglosJSON = (origen, destino) => {
//     const resultadoLogico = origen.every((actual) => destino.includes(actual))
//     return resultadoLogico
// }

// module.exports = router