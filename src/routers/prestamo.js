
const express = require('express');
const router = new express.Router();
const axios = require('axios');

const authcass = require('../middleware/authcass');
const { fxGetCurrentToken } = require('../middleware/mifostoken');

const { prestamoMapper, planpagosMapper, clienteMovs } = require('../model/prestamo');


router.get('/dashboard', authcass, async (req, res) => {


    const loans = await prestamoMapper.find({ account_no: req.user.accountNo });
    const movs = await clienteMovs.find({ account_no: req.user.accountNo });

    const data = {
        prestamos: loans._rs.rows,
        movs: movs._rs.rows
    }

    res.send(data);


});

router.get('/prestamo/:id/detalle', authcass, async (req, res) => {

    const loanId = req.params.id;

    const data = await prestamoMapper.find({ account_no: req.user.accountNo, prestamo_id: loanId })
    if (data._rs.rows.length > 0) {

        res.send(data._rs.rows);

    }
    else {
        res.status(404).send('No encontrado...');
    }


});

router.get('/prestamo/:id/movimientos', authcass, async (req, res) => {

    const loanId = req.params.id;
    const movs = await clienteMovs.find({ account_no: req.user.accountNo, prestamo_id: loanId });

    const data = {
        movs: movs._rs.rows
    }
    
    res.send(data);

});

router.get('/prestamo/:id/calendario', authcass, async (req, res) => {

    const loanId = req.params.id;
    const planpagos = await planpagosMapper.find({ account_no: req.user.accountNo, prestamo_id: loanId });

    res.send(planpagos._rs.rows);

})


router.get('/usuarios/referenciaspago', authcass, async (req, res) => {

    fxGetCurrentToken(async (mifosData) => {

        const data = JSON.parse(mifosData);

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        respuesta = await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/intermediaries?no_cuenta_cliente=${req.user.accountNo}`);

        res.send(respuesta.data);

    }).catch((e) => {
        res.status(401).send(e);
    })

})



router.get('/syncloandata', authcass, async (req, res) => {

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

                    // movimientos
                    const fechaSolicitud =
                        `${respuesta.data.items[i].timeline.submittedOnDate[0]}-
                            ${respuesta.data.items[i].timeline.submittedOnDate[1]}-
                            ${respuesta.data.items[i].timeline.submittedOnDate[2]}-`;

                    const fechaAprobacion =
                        `${respuesta.data.items[i].timeline.approvedOnDate[0]}-
                            ${respuesta.data.items[i].timeline.approvedOnDate[1]}-
                            ${respuesta.data.items[i].timeline.approvedOnDate[2]}-`;

                    const fechaDesembolso =
                        `${respuesta.data.items[i].timeline.actualDisbursementDate[0]}-
                            ${respuesta.data.items[i].timeline.actualDisbursementDate[1]}-
                            ${respuesta.data.items[i].timeline.actualDisbursementDate[2]}-`;

                    await clienteMovs.insert({
                        account_no: req.user.accountNo,
                        fecha_mov: fechaSolicitud,
                        prestamo_id: loanId.toString(),
                        orden: 400,
                        importe: respuesta.data.items[i].summary.principalDisbursed,
                        mensaje: 'Tu solicitud ha sido enviada, en breve te contactaremos',
                        referencia: '',
                        tipo: 'LOANSUB',
                        tipo_nom: 'CREDITO en Tramite'
                    });
                    await clienteMovs.insert({
                        account_no: req.user.accountNo,
                        fecha_mov: fechaAprobacion,
                        prestamo_id: loanId.toString(),
                        orden: 300,
                        importe: respuesta.data.items[i].summary.principalDisbursed,
                        mensaje: 'Felicidades, tienes tu solicitud ha sido aprobada',
                        referencia: '',
                        tipo: 'LOANAPR',
                        tipo_nom: 'CREDITO Aprobado'
                    });

                    await clienteMovs.insert({
                        account_no: req.user.accountNo,
                        fecha_mov: fechaDesembolso,
                        prestamo_id: loanId.toString(),
                        orden: 200,
                        importe: respuesta.data.items[i].summary.principalDisbursed,
                        mensaje: 'Felicidades tu crédito ha sido entregado! es importante que mantengas un historial limpio',
                        referencia: '',
                        tipo: 'LOANDIS',
                        tipo_nom: 'CREDITO Entregado'
                    });

                    const loanSchedData = await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/loanrepaymentschedule/${loanId}`);
                    const nPagosPlan = loanSchedData.data.repaymentSchedule.periods.length;
                    const cuota = loanSchedData.data.repaymentSchedule.periods[1].totalOriginalDueForPeriod;

                    for (j = 0; j < nPagosPlan; j++) {

                        const fechaPago = `${loanSchedData.data.repaymentSchedule.periods[j].dueDate[0]}-${loanSchedData.data.repaymentSchedule.periods[j].dueDate[1]}-${loanSchedData.data.repaymentSchedule.periods[j].dueDate[2]}`;
                        const planpagoData = {
                            account_no: req.user.accountNo,
                            prestamo_id: loanId.toString(),
                            periodo: loanSchedData.data.repaymentSchedule.periods[j].period,
                            pagado: loanSchedData.data.repaymentSchedule.periods[j].complete,
                            capital: loanSchedData.data.repaymentSchedule.periods[j].principalOriginalDue,
                            interes: loanSchedData.data.repaymentSchedule.periods[j].interestOriginalDue,
                            iva: loanSchedData.data.repaymentSchedule.periods[j].taxOnInterestDue,
                            importe: loanSchedData.data.repaymentSchedule.periods[j].totalOriginalDueForPeriod,
                            saldo_pendiente: loanSchedData.data.repaymentSchedule.periods[j].principalLoanBalanceOutstanding,
                            fecha: fechaPago
                        }

                        await planpagosMapper.insert(planpagoData)

                        if (planpagoData.pagado) {
                            await clienteMovs.insert({
                                account_no: req.user.accountNo,
                                fecha_mov: fechaPago,
                                prestamo_id: loanId.toString(),
                                orden: loanSchedData.data.repaymentSchedule.periods[j].period,
                                importe: loanSchedData.data.repaymentSchedule.periods[j].totalOriginalDueForPeriod,
                                mensaje: 'Tu pago ha sido aplicado, gracias',
                                referencia: '',
                                tipo: 'LOANREP',
                                tipo_nom: 'Pago referenciado'

                            })
                        }

                    }

                    let fechaVencidoDesde = respuesta.data.items[i].summary.overdueSinceDate;
                    if (fechaVencidoDesde)
                        fechaVencidoDesde = `${respuesta.data.items[i].summary.overdueSinceDate[0]}-${respuesta.data.items[i].summary.overdueSinceDate[1]}-${respuesta.data.items[i].summary.overdueSinceDate[2]}`;

                    const prestamoData = {
                        account_no: req.user.accountNo,
                        prestamo_account_no: respuesta.data.items[i].accountNo,
                        prestamo_id: loanId.toString(),
                        cuota,
                        monto_original: respuesta.data.items[i].summary.principalDisbursed,
                        nombre_producto: respuesta.data.items[i].loanProductName,
                        plazo: respuesta.data.items[i].numberOfRepayments,
                        saldo_total: respuesta.data.items[i].summary.principalOutstanding,
                        tipo_plazo: respuesta.data.items[i].repaymentFrequencyType.value,
                        vencido_desde: fechaVencidoDesde,
                        atrasado: respuesta.data.items[i].inArrears,
                        saldo_vencido: respuesta.data.items[i].summary.totalExpectedRepayment
                    }
                    await prestamoMapper.insert(prestamoData);


                }

            }


            res.send();

        }
        else {
            res.status(404).send('No se encontraron prestamos...')
        }

    }).catch((err) => {
        res.send(err)
    })
})



module.exports = router;