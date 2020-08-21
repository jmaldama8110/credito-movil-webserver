
const authcass = require('../middleware/authcass')

const express = require('express')
const router = new express.Router()


router.get('/usuarios/yo',authcass, (req, res) => { // GET perfil del usuario
    res.send(req.user);
})

module.exports = router;