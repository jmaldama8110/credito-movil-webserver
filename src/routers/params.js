
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
                { id: 1, valor: 'Adquisición de mercancia', external_id: '2' },
                { id: 2, valor: 'Inversion en maquinaria o herramienta', external_id: '3' },
                { id: 3, valor: 'Gastos personales', external_id: '4' },
                { id: 4, valor: 'Remodelación de vivienda', external_id: '5' },
                { id: 1, valor: 'Otros', external_id: '6' }]
        }

    };

    res.send(parametros);

});


module.exports = router;