
const express = require('express');
const router = new express.Router();
const authcass = require('../middleware/authcass');


router.get('/parametros', authcass, (req, res) => {

    const parametros = {
        prestamos: {
            identificadorProducto: 'ProductId',
            limitesMonto: { minimo: 8000, maximo: 50000 },
            limitesPlazo: { minimo: 4, maximo: 48 },
            tiposPlazo: [
                { id: '1', valor: 'Semanas', external_id: '2' },
                { id: '2', valor: 'Catorcenas', external_id: '3' },
                { id: '3', valor: 'Meses', external_id: '4' }
            ],
            tipoFrecuencia: [
                { id: '1', valor: 'Semanal', external_id: '2' },
                { id: '2', valor: 'Catorcenal', external_id: '3' },
                { id: '3', valor: 'Mensual', external_id: '4' }
            ],
            destinoPrestamo: [
                { id: 0, valor: 'COMPRAR LOCAL O VEHICULO', external_id: '2' },
                { id: 1, valor: 'ADQUIRIR O COMPRAR MERCANCIA', external_id: '3' },
                { id: 2, valor: 'COMPRAR MAQUINARIA, EQUIPO O HERRAMIENTAS', external_id: '4' },
                { id: 5, valor: 'PAGAR DEUDAS DEL NEGOCIO', external_id: '5' },
                { id: 6, valor: 'OTRO FIN RELACIONADO', external_id: '6' },
                { id: 7, valor: 'FINES AJENOS AL NEGOCIO', external_id: '7' }
            ]
        }

    };

    res.send(parametros);

});


module.exports = router;