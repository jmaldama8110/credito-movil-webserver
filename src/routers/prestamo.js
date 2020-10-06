
const express = require('express');
const router = new express.Router();
const axios = require('axios');

const authcass = require('../middleware/authcass');
const { fxGetCurrentToken } = require('../middleware/mifostoken');

const { prestamoMapper, planpagosMapper } = require('../model/prestamo')

router.get('/dashboard', authcass, async (req, res) => {

    const data = {
        prestamos: [
            {
                prestamo_id: 13688,
                prestamo_account_no: '000013688',
                nombre_producto: 'CREDITO SOLIDARIO',
                saldo_total: 14635.20,
                atrasado: false,
                saldo_vencido: 0,
                monto_proximo_pago: 1635.2,
                fecha_proximo_pago: '2020-10-14'
            },
            {
                prestamo_id: 689,
                prestamo_account_no: '000000689',
                nombre_producto: 'TU NEGOCIO CON CONSERVA',
                saldo_total: 23456.50,
                atrasado: false,
                saldo_vencido: 1550.0,
                monto_proximo_pago: 1550.0,
                fecha_proximo_pago: '2020-11-21'
            }

        ],
        movs: [
            { tipo: 'PAYMENT', mensaje: 'Pago aplicado, gracias', importe: 1550.0, fecha_mov: '2020-09-01', visto: true },
            { tipo: 'LOANAPR', mensaje: 'Felicidades, CREDITO aprobado', importe: 35000.0, fecha_mov: '2020-09-01', visto: true },
            { tipo: 'SAVDEP', mensaje: 'Hemos recibido tu pago', importe: 3500.0, fecha_mov: '2020-09-01', visto: true },
            { tipo: 'LOANAPP', mensaje: 'Tu solicitud ha sido enviada', importe: 35000.0, fecha_mov: '2020-09-01', visto: true },
        ]
    };

    res.send(data);


});

router.get('/prestamo/:id/detalle', authcass, async (req, res) => {

    const loanId = req.params.id;

    const data = {
        detalle: {
            prestamo_id: loanId,
            account_no: '000000083987',
            nombre_producto: 'CREDITO SOLIDARIO',
            monto_original: 35000,
            fecha_desembolso: '2020-09-12',
            fecha_primer_pago: '2020-09-21',
            fecha_vencimiento: '2021-04-12',
            atrasado: false,
            saldo_vencido: 1550.0,
            saldo_total: 22450,
            monto_proximo_pago: 1550.0,
            fecha_proximo_pago: '2020-11-21'
        }
    }

    res.send(data);
});

router.get('/prestamo/:id/movimientos', authcass, async (req, res) => {

    const data = {
        movs: [
            { tipo: 'LOANAPR', tipo_nom: 'CREDITO Aprobado', mensaje: 'Felicidades, CREDITO aprobado', importe: 35000.0, fecha_mov: '2020-09-01', referencia: '009783227837823' },
            { tipo: 'SAVDEP', tipo_nom: 'Deposito de Garantia', mensaje: 'Pago de garantia', importe: 3500.0, fecha_mov: '2020-09-01', referencia: '009783227837823' },
            { tipo: 'LOANREP', tipo_nom: 'Pago referenciado', mensaje: 'Reembolso del credito aplicado', importe: 3500.0, fecha_mov: '2020-09-01', referencia: '009783227837823' },
            { tipo: 'LOANSUB', tipo_nom: 'CREDITO en Tramite', mensaje: 'Tu solicitud ha sido enviada', importe: 35000.0, fecha_mov: '2020-09-01', referencia: '009783227837823' }
        ]

    }

    res.send(data);
});




router.get('/prestamos', authcass, async (req, res) => {

    fxGetCurrentToken(async (mifosData) => {

        const data = JSON.parse(mifosData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/loans?pageNumber=1&pageSize=15&client_id=${req.user.clientId}`)
            .then((respuesta) => {
                const nitems = respuesta.data.items.length;
                if (nitems > 0) { // si encuentra prestamos registrados

                    let newData = [];

                    for (i = 0; i < nitems; i++) {

                        // const loanId = respuesta.data.items[i].id;
                        // const loanSchedData = await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/loanrepaymentschedule/${loanId}`);


                        const activo = respuesta.data.items[i].status.active;
                        if (activo) { /// solo agrega prestamos activos

                            let fechaVencidoDesde = respuesta.data.items[i].summary.overdueSinceDate;
                            if (fechaVencidoDesde)
                                fechaVencidoDesde = `${respuesta.data.items[i].summary.overdueSinceDate[0]}-${respuesta.data.items[i].summary.overdueSinceDate[1]}-${respuesta.data.items[i].summary.overdueSinceDate[2]}`;

                            newData = [...newData,
                            {
                                prestamo_id: loanId,
                                account_no: req.user.accountNo,
                                prestamo_account_no: respuesta.data.items[i].accountNo,
                                creado_el: Date.now(),
                                estatus: respuesta.data.items[i].status.value,
                                nombre_producto: respuesta.data.items[i].loanProductName,
                                monto_original: respuesta.data.items[i].principal,
                                plazo: respuesta.data.items[i].termFrequency,
                                tipo_plazo: respuesta.data.items[i].termPeriodFrequencyType.value,
                                pagar_cada: respuesta.data.items[i].repaymentEvery,
                                tasa_interes: respuesta.data.items[i].interestRatePerPeriod,
                                importe: loanSchedData.data.repaymentSchedule.periods[0],

                                principaldisbursed: respuesta.data.items[i].summary.principalDisbursed,
                                principalpaid: respuesta.data.items[i].summary.principalPaid,
                                principalwrittenoff: respuesta.data.items[i].summary.principalWrittenOff,
                                principaloutstanding: respuesta.data.items[i].summary.principalOutstanding,
                                principaloverdue: respuesta.data.items[i].summary.principalOverdue,
                                interestcharged: respuesta.data.items[i].summary.interestCharged,
                                interestpaid: respuesta.data.items[i].summary.interestPaid,
                                interestwaived: respuesta.data.items[i].summary.interestWaived,
                                interestwrittenOff: respuesta.data.items[i].summary.interestWrittenOff,
                                interestoutstanding: respuesta.data.items[i].summary.interestOutstanding,
                                interestoverdue: respuesta.data.items[i].summary.interestOverdue,
                                feechargescharged: respuesta.data.items[i].summary.feeChargesCharged,
                                feechargesdueatdisbursementcharged: respuesta.data.items[i].summary.feeChargesDueAtDisbursementCharged,
                                feechargespaid: respuesta.data.items[i].summary.feeChargesPaid,
                                feechargeswaived: respuesta.data.items[i].summary.feeChargesWaived,
                                feechargeswrittenoff: respuesta.data.items[i].summary.feeChargesWrittenOff,
                                feechargesoutstanding: respuesta.data.items[i].summary.feeChargesOutstanding,
                                feechargesoverdue: respuesta.data.items[i].summary.feeChargesOverdue,
                                penaltychargescharged: respuesta.data.items[i].summary.penaltyChargesCharged,
                                penaltychargespaid: respuesta.data.items[i].summary.penaltyChargesPaid,
                                penaltychargeswaived: respuesta.data.items[i].summary.penaltyChargesWaived,
                                penaltychargeswrittenOff: respuesta.data.items[i].summary.penaltyChargesWrittenOff,
                                penaltychargesoutstanding: respuesta.data.items[i].summary.penaltyChargesOutstanding,
                                penaltychargesoverdue: respuesta.data.items[i].summary.penaltyChargesOverdue,
                                totalexpectedrepayment: respuesta.data.items[i].summary.totalExpectedRepayment,
                                totalrepayment: respuesta.data.items[i].summary.totalRepayment,
                                totalexpectedcostofloan: respuesta.data.items[i].summary.totalExpectedCostOfLoan,
                                totalcostofloan: respuesta.data.items[i].summary.totalCostOfLoan,
                                totalwaived: respuesta.data.items[i].summary.totalWaived,
                                totalwrittenoff: respuesta.data.items[i].summary.totalWrittenOff,
                                totaloutstanding: respuesta.data.items[i].summary.totalOutstanding,
                                totaloverdue: respuesta.data.items[i].summary.totalOverdue,
                                overduesincedate: fechaVencidoDesde
                            }]
                        }
                    }


                    console.log(newData);
                    res.send('Se ha generado el arreglo...')

                }
                else {
                    res.status(404).send('No se encontraron prestamos...')
                }

            }).catch((err) => {
                res.send(err)
            })
    })

})

router.get('/planpagos', authcass, async (req, res) => {

    fxGetCurrentToken(async (mifosData) => {

        const data = JSON.parse(mifosData);

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        respuesta = await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/loans?pageNumber=1&pageSize=15&client_id=${req.user.clientId}`);

        const nitems = respuesta.data.items.length;
        if (nitems > 0) { // si encuentra prestamos registrados

            for (i = 0; i < nitems; i++) {

                const activo = respuesta.data.items[i].status.active;
                const loanId = respuesta.data.items[i].id;

                if (activo) {

                    const loanSchedData = await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/loanrepaymentschedule/${loanId}`);
                    const nPagosPlan = loanSchedData.data.repaymentSchedule.periods.length;
                    const cuota = loanSchedData.data.repaymentSchedule.periods[1].totalOriginalDueForPeriod;

                    for (j = 0; j < nPagosPlan; j++) {

                        const fechaPago = `${loanSchedData.data.repaymentSchedule.periods[j].dueDate[0]}-${loanSchedData.data.repaymentSchedule.periods[j].dueDate[1]}-${loanSchedData.data.repaymentSchedule.periods[j].dueDate[2]}`
                        const planpagoData = {
                            account_no: req.user.accountNo,
                            prestamo_id: loanId.toString(),
                            periodo: loanSchedData.data.repaymentSchedule.periods[j].period.toString(),
                            pagado: loanSchedData.data.repaymentSchedule.periods[j].complete,
                            capital: loanSchedData.data.repaymentSchedule.periods[j].principalOriginalDue,
                            interes: loanSchedData.data.repaymentSchedule.periods[j].interestOriginalDue,
                            iva: loanSchedData.data.repaymentSchedule.periods[j].taxOnInterestDue,
                            importe: loanSchedData.data.repaymentSchedule.periods[j].totalOriginalDueForPeriod,
                            saldo_pendiente: loanSchedData.data.repaymentSchedule.periods[j].principalLoanBalanceOutstanding,
                            fecha: fechaPago
                        }

                        await planpagosMapper.insert(planpagoData)

                    }

                    let fechaVencidoDesde = respuesta.data.items[i].summary.overdueSinceDate;
                    if (fechaVencidoDesde)
                        fechaVencidoDesde = `${respuesta.data.items[i].summary.overdueSinceDate[0]}-${respuesta.data.items[i].summary.overdueSinceDate[1]}-${respuesta.data.items[i].summary.overdueSinceDate[2]}`;

                    const prestamoData = {
                        account_no: respuesta.data.items[i].accountNo,
                        prestamo_id: loanId.toString(),
                        cuota,
                        monto_original: respuesta.data.items[i].summary.principalDisbursed,
                        nombre_producto: respuesta.data.items[i].loanProductName,
                        plazo: respuesta.data.items[i].numberOfRepayments,
                        saldo_total: respuesta.data.items[i].summary.principalOutstanding,
                        tipo_plazo: respuesta.data.items[i].repaymentFrequencyType.value,
                        vencido_desde: fechaVencidoDesde
                    }
                    await prestamoMapper.insert(prestamoData);


                }

            }


            res.send('Se ha generado el arreglo...')

        }
        else {
            res.status(404).send('No se encontraron prestamos...')
        }

    }).catch((err) => {
        res.send(err)
    })
})



module.exports = router;