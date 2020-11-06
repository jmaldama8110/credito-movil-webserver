
const express = require('express');
const router = new express.Router();
const axios = require('axios');

const authcass = require('../middleware/authcass');
const { fxGetCurrentToken } = require('../middleware/mifostoken');

const { prestamoMapper, planpagosMapper, clienteMovs } = require('../model/prestamo');
const { LocalInstance } = require('twilio/lib/rest/api/v2010/account/availablePhoneNumber/local');



router.post('/prestamo', authcass, (req, res) => {


    console.log(req.body);

    res.status(201).send();

})

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

});



router.get('/usuarios/syncloandata', authcass, async (req, res) => {

    fxGetCurrentToken(async (mifosData) => {

        const data = JSON.parse(mifosData);

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        respuesta = await axios.get(`${process.env.MIFOS_BASEURL}/api/v1/loans?pageNumber=1&pageSize=15&client_id=${req.user.clientId}`);

        const nitems = respuesta.data.items.length;
        if (nitems > 0) { // si encuentra prestamos registrados

            for (i = 0; i < nitems; i++) {

                const estatus = respuesta.data.items[i].status.id;
                if (estatus <= 300) {

                    const loanId = respuesta.data.items[i].id;
                    const submittedOnDate = respuesta.data.items[i].timeline.submittedOnDate;
                    const approvedOnDate = respuesta.data.items[i].timeline.approvedOnDate;
                    const actualDisbursementDate = respuesta.data.items[i].timeline.actualDisbursementDate;
                    const expectedMaturityDate = respuesta.data.items[i].timeline.expectedMaturityDate;
                    const importe = respuesta.data.items[i].principal;
                    const propositoId = respuesta.data.items[i].loanPurposeId;
                    


                    // movimientos
                    let fechaSolicitud;
                    if (submittedOnDate) {
                        fechaSolicitud = `${submittedOnDate[0]}-${submittedOnDate[1]}-${submittedOnDate[2]}`;
                        await clienteMovs.insert({
                            account_no: req.user.accountNo,
                            fecha_mov: fechaSolicitud,
                            prestamo_id: loanId.toString(),
                            orden: 400,
                            importe,
                            mensaje: 'Tu solicitud ha sido enviada, en breve te contactaremos',
                            referencia: '',
                            tipo: 'LOANSUB',
                            tipo_nom: 'CREDITO en Tramite'
                        });

                    }
                    let fechaVencimiento;
                    if( expectedMaturityDate ){
                        fechaVencimiento = `${expectedMaturityDate[0]}-${expectedMaturityDate[1]}-${expectedMaturityDate[2]}`;
                    }


                    let fechaAprobacion;
                    if (approvedOnDate) {
                        fechaAprobacion = `${approvedOnDate[0]}-${approvedOnDate[1]}-${approvedOnDate[2]}`;
                        await clienteMovs.insert({
                            account_no: req.user.accountNo,
                            fecha_mov: fechaAprobacion,
                            prestamo_id: loanId.toString(),
                            orden: 300,
                            importe,
                            mensaje: 'Felicidades, tienes tu solicitud ha sido aprobada',
                            referencia: '',
                            tipo: 'LOANAPR',
                            tipo_nom: 'CREDITO Aprobado'
                        });

                    }

                    let fechaDesembolso;
                    if (actualDisbursementDate) {
                        fechaDesembolso = `${actualDisbursementDate[0]}-${actualDisbursementDate[1]}-${actualDisbursementDate[2]}`;
                        await clienteMovs.insert({
                            account_no: req.user.accountNo,
                            fecha_mov: fechaDesembolso,
                            prestamo_id: loanId.toString(),
                            orden: 200,
                            importe,
                            mensaje: 'Felicidades tu crédito ha sido entregado! es importante que mantengas un historial limpio',
                            referencia: '',
                            tipo: 'LOANDIS',
                            tipo_nom: 'CREDITO Entregado'
                        });

                    }

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

                    const loanItem = respuesta.data.items[i];
                    const estaVencido = loanItem.inArrears;
                    
                    const saldoTotal = ('summary' in loanItem) ? loanItem.summary.principalOutstanding: 0;
                    const vencidoDesde = ( 'summary' in loanItem ) && (estaVencido) ? `${loanItem.summary.overdueSinceDate[0]}-${loanItem.summary.overdueSinceDate[1]}-${loanItem.summary.overdueSinceDate[2]}` : undefined;
                    const saldoVencido = ('summary' in loanItem ) ? loanItem.summary.totalOverdue : 0;
                    const montoOriginal = ('summary' in loanItem ) ? loanItem.summary.principalDisbursed: importe;


                    const prestamoData = {
                        account_no: req.user.accountNo,
                        prestamo_account_no: respuesta.data.items[i].accountNo,
                        prestamo_id: loanId.toString(),
                        cuota,
                        nombre_producto: respuesta.data.items[i].loanProductName,
                        plazo: respuesta.data.items[i].numberOfRepayments,
                        tipo_plazo: respuesta.data.items[i].repaymentFrequencyType.value, 
                        estatus: estatus.toString(),
                        atrasado: respuesta.data.items[i].inArrears,

                        fecha_solicitud: fechaSolicitud,
                        fecha_aprobacion: fechaAprobacion,
                        fecha_desembolso: fechaDesembolso,
                        fecha_vencimiento: fechaVencimiento,
                        proposito_id : propositoId,
                        proposito_description: 'ADQUIRIR O COMPRAR MERCANCIA',
                        saldo_total: saldoTotal,
                        vencido_desde: vencidoDesde,
                        saldo_vencido: saldoVencido,
                        monto_original: montoOriginal
                    }
                    await prestamoMapper.insert(prestamoData);

                } //// cierre de condicion que evalua cada estatus de cada prestamo


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