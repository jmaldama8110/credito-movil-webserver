
const express = require('express');
const router = new express.Router()
const axios = require('axios');

const authcass = require('../middleware/authcass')
const { fxGetCurrentToken } = require('../middleware/mifostoken')


router.get('/prestamos', authcass, async (req, res) => {


    fxGetCurrentToken(async (mifosData) => {

        const data = JSON.parse(mifosData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/loans?pageNumber=1&pageSize=15&client_id=${req.user.clientId}`)
            .then((respuesta) => {
                    res.send(respuesta.data);
            }).catch((err) => {
                res.send(err)
            })
    })


})

module.exports = router;