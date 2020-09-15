
const authcass = require('../middleware/authcass')
const axios = require('axios');
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const sharp = require('sharp');

const { usuarioMapper, tokensMapper, credencialesMapper,
    findUsuarioPorAccountNo,
    findUsuarioPorCredenciales,
    generarTokenAcceso,
    validarUsuarioJson } = require('../model/usuario')

const { cliente } = require('../db/cassandra-db')

const sendWelcomeSMS = require('../sms/sendsms')
const sendWelcomeWhatsapp = require('../sms/sendwapp');
const { fxGetCurrentToken } = require('../middleware/mifostoken')
const express = require('express');
const router = new express.Router()

router.get('/usuarios/yo', authcass, async (req, res) => { // GET perfil del usuario

    const data = mifosToken();

    res.send({ usuario: req.user, data });
})

// CREAR usuario
router.post('/usuarios', async (req, res) => {
    const currentMifosToken = fxGetCurrentToken();
    console.log(currentMifosToken )
    try {

        /// primero, valida que no haya errores en el JSON enviando en la peticion
        const errores = validarUsuarioJson(req.body)
        if (errores.length > 0) {
            res.status(400).send(errores);
        }
        else {

            const usuarioBusqueda = await findUsuarioPorAccountNo(req.body.account_no);

            if (!usuarioBusqueda) {
                try {
                    const newId = uuidv4();
                    const token = generarTokenAcceso(req.body.account_no)

                    const encodedPass = await bcrypt.hash(req.body.password, 8);
                    const usuarioNuevo = {
                        ...req.body,
                        usuario_id: newId,
                        password: encodedPass,
                        creado_el: Date.now(),
                        tokens: token,
                        verificado: false
                    }

                    await usuarioMapper.insert(usuarioNuevo);
                    const codigoActivacion = newId.toString().substring(0,6);
                    //sendWelcomeSMS(`+52${usuarioNuevo.numero_movil}`, `${usuarioNuevo.nombre} tu codigo es ${codigoActivacion}`)
                    sendWelcomeWhatsapp(`+521${usuarioNuevo.numero_movil}`, `${usuarioNuevo.nombre} tu codigo es ${codigoActivacion}`)

                    res.status(201).send({ usuarioNuevo, token })
                }
                catch (error) {
                    console.log(error)
                    res.status(500).send(error);
                }
            }
            else {
                res.status(400).send('El account_no ya se encuentra registrado...')
            }

        }

    }
    catch (error) {
        console.log(error);
        res.status(400).send('Peticion de registro no valida...');
    }
});

//Usuario LOGIN
router.post('/usuarios/login', async (req, res) => { // Enviar peticion Login, generar un nuevo token

    try {

        const user = await findUsuarioPorCredenciales(req.body.account_no, req.body.password)
        const token = generarTokenAcceso(user.accountNo)

        await tokensMapper.insert({
            account_no: user.accountNo,
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
        // solamente si el usuario tiene una valor en account_no
        if (req.user.account_no) {

            axios.defaults.headers.common['Authorization'] = `Bearer ${respuesta.data.token}`;

            await axios.get('https://fincoredemo.dnsalias.net/api/v1/clients?office_id=0&search=000001100')
                .then((response) => {
                    res.send(response.data);
                }).catch((err) => {
                    console.log(err);
                    res.status(404).send();

                })
        }
        res.status(404).send();
    }).catch((err) => {
        res.send(err);
    })

})

// Usuario LOGOUT
router.post('/usuarios/logout', authcass, async (req, res) => {

    try {
        await tokensMapper.remove({
            account_no: req.user.accountNo,
            tokens: req.currentToken
        })
        res.send();
    }
    catch (error) {
        res.status(500).send(error)
    }

})

router.post('/usuarios/logoutall', authcass, async (req, res) => {

    try {
        // Use query markers (?) and parameters
        const query = 'DELETE FROM usuario_tokens WHERE account_no=? ';
        const params = [req.user.accountNo];

        // Set the prepare flag in the query options
        await cliente.execute(query, params, { prepare: true });

        res.send();

    }
    catch (error) {
        res.status(401).send(error)

    }

})


const upload = multer({
    //dest: 'avatars', commentado para evitar que envie el archivo sea enviado a la carpeta fisica del server
    limits: {
        fileSize: 1000000 // 1,0 megabytes
    },
    fileFilter(req, file, cb) { // cb -> callback function

        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { // Expresion regular-> checar regex101.com
            return cb(new Error('Formato de archivo no valido.. solo usar PNG, JPEG, JPG'))
        }

        cb(undefined, true)
        // cb( new Error('file type in not accepted') )
        // cb( undefined, true )
        // cb( undefined, false )
    }
})

// POST actualizar imagen avater del usuario autenticado
router.post('/usuarios/yo/selfi', authcass, upload.single('selfi'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({ width: 550, height: 550 }).png().toBuffer()

    // req.user.selfi = buffer
    try {
        // Use query markers (?) and parameters
        const query = 'UPDATE usuario_credenciales set avatar=? WHERE account_no=? ';
        const cadenaBase64 = buffer.toString('base64');

        const params = [buffer, req.user.accountNo];

        // Set the prepare flag in the query options
        await cliente.execute(query, params, { prepare: true });

        res.send(cadenaBase64);
    }
    catch (error) {
        res.status(401).send(error)
    }

}, (error, req, res, next) => {  // handle error while loading upload
    res.status(400).send({ error: error.message })
})

// GET obtener el avatar de cualquier usuario (sin estar logeado)
router.get('/usuarios/:id/selfi', async (req, res) => {

    try {

        const usuario = await credencialesMapper.get({ account_no: req.params.id })

        if (!usuario || !usuario.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png') // respues en modo imagen desde el server
        res.send(usuario.avatar) // send -> campo buffer

    } catch (error) {
        res.status(404).send(error)
    }

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