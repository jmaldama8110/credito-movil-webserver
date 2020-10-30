
const authcass = require('../middleware/authcass')
const axios = require('axios');
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const sharp = require('sharp');
const validator = require('validator');


const { usuarioMapper, tokensMapper, credencialesMapper,
    findUsuarioPorAccountNo,
    findUsuarioPorCredenciales,
    generarTokenAcceso,
    validarUsuarioJson,
    isValidPassword,
    usuarioPublico } = require('../model/usuario')

const { cliente } = require('../db/cassandra-db')

const sendWelcomeSMS = require('../sms/sendsms')
const sendWelcomeWhatsapp = require('../sms/sendwapp');
const { fxGetCurrentToken } = require('../middleware/mifostoken')
const express = require('express');
const router = new express.Router()



router.get('/usuarios/yo', authcass, async (req, res) => { // GET perfil del usuario

    res.send({ usuario: usuarioPublico(req.user) });
})

// CREAR usuario
router.post('/usuarios', async (req, res) => {

    try {

        /// primero, valida que no haya errores en el JSON enviando en la peticion
        const errores = validarUsuarioJson(req.body)
        if (errores.length > 0) {
            res.status(400).send(errores);
        }
        else {

            const usuarioExistente = await findUsuarioPorAccountNo(req.body.account_no);
            if (usuarioExistente && usuarioExistente.verificado) {
                res.status(404).send('Usuario ya ha sido verificado...');
                return;
            }
            //Busca cliente por account_no al Fineract
            fxGetCurrentToken(async (mifosData) => {
                /// axios apunta al API de fineract para obtener datos del cliente desde mifos
                const data = JSON.parse(mifosData);

                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

                await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/clients?office_id=0&search=${req.body.account_no}`)
                    .then(async (response) => {
                        //// si la respuesta contiene el resultado correcto desde Fineract items son todos los elementos devueltos
                        if (response.data.items.length !== 1) {
                            throw 'Numero de items devueltos por fineract, incorrecto';
                        }

                        /// valida curp enviado sea igual al curp buscado
                        if (response.data.items[0].curp !== req.body.curp) {
                            throw 'El curp en el body no corresponde al curp registrado...';
                        }

                        try {
                            const newId = uuidv4();
                            const token = generarTokenAcceso(req.body.account_no)

                            const encodedPass = await bcrypt.hash(req.body.password, 8);
                            const usuarioNuevo = {
                                ...req.body,
                                client_id: `${response.data.items[0].id}`,
                                apellido_materno: response.data.items[0].middlename,
                                apellido_paterno: response.data.items[0].lastname,
                                nombre: response.data.items[0].firstname,
                                clave_ine: response.data.items[0].elector_key,
                                serie_ine: response.data.items[0].elector_vertical_num,
                                curp: response.data.items[0].curp,
                                fecha_nacimiento: response.data.items[0].date_of_birth,
                                usuario_id: newId,
                                password: encodedPass,
                                creado_el: Date.now(),
                                tokens: token
                            }

                            await usuarioMapper.insert(usuarioNuevo);
                            // const codigoActivacion = newId.toString().substring(0, 6);
                            // //sendWelcomeSMS(`+52${usuarioNuevo.numero_movil}`, `${usuarioNuevo.nombre} tu codigo es ${codigoActivacion}`)
                            // sendWelcomeWhatsapp(`+521${usuarioNuevo.numero_movil}`, `${usuarioNuevo.nombre} tu codigo es ${codigoActivacion}`)

                            res.status(201).send({ usuario: usuarioPublico(usuarioNuevo), token })
                        }
                        catch (error) {
                            console.log(error)
                            res.status(500).send(error);
                        }
                        //////////////

                    }).catch((err) => { /// si no encuentra el accont_no en mifos, no permite crear el usuario
                        console.log(err);
                        res.status(404).send(err);

                    })
            }) // fin de callback -> fxGetCurrentToken

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

        res.send({ usuario: usuarioPublico(user), token })

    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/usuarios/enviarcodigo', authcass, (req, res) => {

    try {

        const numeroMovil = req.body.numeroMovil;
        const codigoEnviado = req.user.usuarioId.toString().substring(0, 6); // codigo enviado al telefono del usuario
        //sendWelcomeSMS(`+52${usuarioNuevo.numero_movil}`, `${usuarioNuevo.nombre} tu codigo es ${codigoActivacion}`)
        sendWelcomeWhatsapp(`+521${numeroMovil}`, `${req.user.nombre} tu codigo es ${codigoEnviado}, expira en 5 minutos`)

        res.status(200).send({ mensaje: `Se ha enviado el codigo al numero:  ${numeroMovil}` });

    }
    catch (error) {
        res.status(400).send(error);
    }
})

router.post('/usuarios/:codigoingresado/verificar/:numeromovil', authcass, async (req, res) => {

    try {

        const codigoIngresado = req.params.codigoingresado; // codigo ingresado por el cliente
        const codigoEnviado = req.user.usuarioId.toString().substring(0, 6); // codigo enviado
        const movilVerificado = req.params.numeromovil; // numero movil nuevo

        if (codigoIngresado === codigoEnviado) {
            // Use query markers (?) and parameters
            const query = 'UPDATE usuarios SET numero_movil=?,verificado=true WHERE account_no=? ';
            const params = [movilVerificado, req.user.accountNo];

            // Set the prepare flag in the query options
            await cliente.execute(query, params, { prepare: true });
            sendWelcomeWhatsapp(`+521${movilVerificado}`, `Felicidades ${req.user.nombre.toString()}, tu registro se ha completado de manera existosa. 
                                    Agradecemos tu confianza! tus datos personales estan protegidos. Recuerda llamar al 01800 CONSERVA - o si prefieres, escribe "ayuda"
                                     en este chat y un ejecutivo se pondra en contacto contigo.. Enhorabuena! `)

            res.send({ mensaje: `Se ha verificado el numero ${movilVerificado}` });

        } else {
            res.status(404).send('Codigo de activacion no valido...')
        }

    } catch (error) {
        res.status(400).send(error);
    }
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

/// TAREAS 27-OCT 2020
/*
3. Ruta "usuarios/recuperaracceso" { account_no } - solicitar cambiar password cuando olvidaste tu password y no estas logueado
4. Ruta "usuarios/confirmarpassword" { codigo, curp, nuevo_password } - 
*/

router.post('/usuarios/cambiarpassword', authcass, async (req, res) => {

    const passActual = req.user.password;
    const passIngresado = req.body.viejo_password
    const passNuevo = req.body.nuevo_password;

    if ((!passIngresado) || (!passNuevo)) {
        res.status(400).send();
    }
    else {

        const isValido = await isValidPassword(passIngresado, passActual);

        if (isValido) {

            // Eliminar todos los tokens registrado con la contraseña anterior
            const query = 'DELETE FROM usuario_tokens WHERE account_no=? ';
            const params = [req.user.accountNo];

            await cliente.execute(query, params, { prepare: true });
            ///////

            /// Actualiza el password nuevo encriptado
            const encodedPass = await bcrypt.hash(passNuevo, 8);
            const query2 = 'UPDATE usuarios SET password=? WHERE account_no=?';
            const params2 = [encodedPass, req.user.accountNo];
            await cliente.execute(query2, params2, { prepare: true })
            ///////////

            res.status(200).send();

        }
        else {
            res.status(404).send();
        }


    }
});

router.post('/usuarios/recuperaracceso', async (req, res) => {

    const accountNo = req.body.account_no;    
    if ( accountNo ) { //Si el campo de account_no es valido en el body del JSON

        const Usuario = await findUsuarioPorAccountNo( accountNo );

        if( Usuario && Usuario.verificado ){

            const NumeroMovil = Usuario.numeroMovil;
            const Nombre = Usuario.nombre;
            const codigoEnviado = Usuario.usuarioId.toString().substring(24, 30); 
    
            sendWelcomeWhatsapp(`+521${NumeroMovil}`, `${Nombre} recupera tu acceso con este codigo: ${codigoEnviado}, expira en 5 minutos`);
            //sendWelcomeSMS(`+52${NumeroMovil}`, `${Nombre} tu codigo es ${codigoEnviado}`)

            res.send();
        }
        else {
            res.status(400).send('1) No se pudo solicitar acceso')
        }

    }
    else {
        res.status(400).send('2) No se pudo solicitar acceso');
    }

});

router.post('/usuarios/confirmaracceso', async (req, res)=>{

    const accountNo = req.body.account_no;
    const curp = req.body.curp;
    const codigoIngresado = req.body.codigo;
    const nuevoPassword = req.body.nuevo_password;

    if( ! (curp && codigoIngresado && nuevoPassword && accountNo)  ){ /// si los campos del body son validos!
        res.status(400).send();
    }
    else {

        const Usuario = await findUsuarioPorAccountNo( accountNo );

        if( Usuario ){ // si encontro el usuario

            const codigoEnviado = Usuario.usuarioId.toString().substring(24, 30); 
            
            if( ( Usuario.curp !== curp ) || ( codigoEnviado !== codigoIngresado ) ){ // valida la curp y el codigo enviado correspondan al usuario encontrado
                res.status(400).send();
            } 
            else{
                /// aqui ya todo esta OK para actualizar el nuevo password

                // Eliminar todos los tokens registrado con la contraseña anterior
                const query = 'DELETE FROM usuario_tokens WHERE account_no=? ';
                const params = [accountNo];

                await cliente.execute(query, params, { prepare: true });
                /////

                /// Actualiza el password nuevo encriptado
                const encodedPass = await bcrypt.hash(nuevoPassword, 8);
                const query2 = 'UPDATE usuarios SET password=? WHERE account_no=?';
                const params2 = [encodedPass, accountNo];
                await cliente.execute(query2, params2, { prepare: true })
                ///////////


                res.send();
            }


        }
        else {

            res.status(400).send();
        }

        res.send();
    }


});

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
        const query = 'UPDATE usuarios set selfi=? WHERE account_no=? ';
        const cadenaBase64 = buffer.toString('base64');

        const params = [cadenaBase64, req.user.accountNo];

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

        const usuario = await usuarioMapper.get({ account_no: req.params.id })

        if (!usuario || !usuario.selfi) {
            throw new Error()
        }

        const buff = new Buffer.from(usuario.selfi, 'base64');

        res.set('Content-Type', 'image/png') // respues en modo imagen desde el server
        res.send(buff) // send -> campo buffer

    } catch (error) {
        res.status(404).send(error)
    }

})

module.exports = router;
