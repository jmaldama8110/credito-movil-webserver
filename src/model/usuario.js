const { mapper } = require('../db/cassandra-db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');


const usuarioMapper = mapper.forModel('Usuario');
const tokensMapper = mapper.forModel('Tokens');
const credencialesMapper = mapper.forModel('Credenciales');


const validarUsuarioJson = (usuarioRequest) => {

    let msjErr = [];

    /// Destructuring de objeto json a variables individuales
    let {
        account_no = '',
        client_id = '',
        apellido_materno = '',
        apellido_paterno = '',
        nombre = '',
        clave_ine = '',
        serie_ine = '',
        curp = '',
        fecha_nacimiento = '',
        email = '',
        password = '',
        numero_movil = '' } = usuarioRequest

    if (!validator.isJSON(JSON.stringify(usuarioRequest), {})) {
        msjErr = [...msjErr, `JSON body no es valido`];
        return msjErr;
    }

    if (typeof account_no !== 'string' ||
        typeof client_id !== 'string' ||
        typeof apellido_materno !== 'string' ||
        typeof apellido_paterno !== 'string' ||
        typeof nombre !== 'string' ||
        typeof clave_ine !== 'string' ||
        typeof serie_ine !== 'string' ||
        typeof curp !== 'string' ||
        typeof fecha_nacimiento !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof numero_movil !== 'string') {
        msjErr = [...msjErr, `Deben ser cadena: account_no,client_id, apellido_materno, apellido_paterno, nombre, usuario_id,clave_ine,serie_ine,curp,fecha_nacimiento,email,password,numero_movil`];
        return msjErr;
    }


    // account no
    account_no = account_no.trim();
    accountNoLength = validator.isLength(account_no, { min: 9, max: 9 });
    accountNoIsInteger = validator.isInt(account_no, { min: 1, max: 999999999 })


    if (!accountNoLength)
        msjErr = [...msjErr, `account_no: Longitud debe ser 9 caracteres =>${account_no}`]

    if (!accountNoIsInteger)
        msjErr = [...msjErr, `account_no: Deber ser entero min 9: max 999999999 =>${account_no}`]
    /// apellido materno
    apellido_materno = apellido_materno.trim();
    apellidoMaternoLength = validator.isLength(apellido_materno, { min: 1, max: 40 });

    if (!apellidoMaternoLength)
        msjErr = [...msjErr, `apellido_materno: Longitud min 1 caracter =>${apellido_materno}`]

    // apellido paterno
    apellido_paterno = apellido_paterno.trim();
    apellidoPaternoLength = validator.isLength(apellido_paterno, { min: 1, max: 40 });

    if (!apellidoPaternoLength)
        msjErr = [...msjErr, `apellido_paterno: Longitud min 1 caracter =>${apellido_paterno}`]
    //nombre
    nombre = nombre.trim();
    nombreLength = validator.isLength(nombre, { min: 1, max: 40 });

    if (!nombreLength)
        msjErr = [...msjErr, `nombre: Longitud min 1 caracter => ${nombre}`]
    //fecha de nacimiento
    // fecha_nacimiento = fecha_nacimiento.trim();
    // fechaNacimientoIsDate = validator.isDate(fecha_nacimiento, "YYYY/MM/DD");

    // if (!fechaNacimientoIsDate)
    //     msjErr = [...msjErr, `fecha_nacimiento: Debe ser una formato valido (1990-12-24) =>${fecha_nacimiento}`]

    // CURP
    curp = curp.trim().toUpperCase();
    curpLength = validator.isLength(curp, { min: 18, max: 18 });
    curpAlfanumerico = validator.isAlphanumeric(curp);
    
    if(!curpLength)
        msjErr = [...msjErr,`curp: Debe ser de 18 caracteres...`]
    if(!curpAlfanumerico)
        msjErr = [...msjErr,`curp: Debe contener solamente letras mayuscular y numeros...`]

    // email
    email = email.trim();
    emailIsEmail = validator.isEmail(email);

    if (!emailIsEmail)
        msjErr = [...msjErr, `email: Formato de correo no valido =>${email}`]
    // password
    passwordLength = validator.isLength(password, { min: 6, max: 12 });
    passwordAlfanumerico = validator.isAlphanumeric(password);

    if (!passwordLength)
        msjErr = [...msjErr, `password: Debe contener entre 6 y 12 caracteres =>${passwordLength}`]

    if (!passwordAlfanumerico)
        msjErr = [...msjErr, `password: Solo debe contener letras mayusculas, minusculas y/o numeros =>${passwordAlfanumerico}`]
    // numero movil
    numero_movil = numero_movil.trim();
    numeroMovilLength = validator.isLength(numero_movil, { min: 10, max: 10 });
    numeroMovilIsInteger = validator.isInt(numero_movil);

    if (!numeroMovilLength)
        msjErr = [...msjErr, `numero_movil: Debe ser de 10 posiciones (solo telefonos de MX) =>${numero_movil}`]

    if (!numeroMovilIsInteger)
        msjErr = [...msjErr, `numero_movil: Solamente se aceptan numeros en formato de 10 digitos(MX)${numero_movil}`]

    return msjErr;
}

const generarTokenAcceso = (id) => {

    const jwt_secret_key = process.env.JWT_SECRET_KEY
    const token = jwt.sign({ accountNoCoded: id }, jwt_secret_key)

    return token

}


const findUsuarioPorCredenciales = async (accountNo, password) => {

    const usuario = await usuarioMapper.get({ accountNo })
    if (!usuario) {
        throw new Error('No fue posible loguearse...')
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
        throw new Error('No fue posible loguearse...')
    }

    return usuario;
}

const findUsuarioPorAccountNo = async (account_no) => {

    const user = await usuarioMapper.get({ account_no })

    return user;

}


module.exports = {
    usuarioMapper,
    tokensMapper,
    credencialesMapper,
    findUsuarioPorAccountNo,
    findUsuarioPorCredenciales,
    generarTokenAcceso,
    validarUsuarioJson
};