
const items = [
        {
            "id": 13981,
            "accountNo": "000013981",
            "status": {
                "id": 100,
                "code": "loanStatusType.submitted.and.pending.approval",
                "value": "Submitted and pending approval",
                "pendingApproval": true,
                "waitingForDisbursal": false,
                "active": false,
                "closedObligationsMet": false,
                "closedWrittenOff": false,
                "closedRescheduled": false,
                "closed": false,
                "overpaid": false
            },
            "clientId": 5,
            "clientAccountNo": "000000005",
            "clientName": "Agustin Palacios  Aguado",
            "clientOfficeId": 44,
            "groupId": 0,
            "loanProductId": 17,
            "loanProductName": "CREDITO ESPECIAL",
            "loanProductDescription": "SIMPLE",
            "isLoanProductLinkedToFloatingRate": false,
            "fundId": 2,
            "fundName": "BAJIO",
            "bankId": 0,
            "bankAccountId": 0,
            "paymentTypeId": 0,
            "loanPurposeId": 0,
            "loanOfficerId": 0,
            "loanType": {
                "id": 1,
                "code": "accountType.individual",
                "value": "Individual"
            },
            "currency": {
                "code": "MXN",
                "name": "Mexican Peso",
                "decimalPlaces": 2,
                "inMultiplesOf": 1,
                "displaySymbol": "$",
                "nameCode": "currency.MXN",
                "displayLabel": "Mexican Peso ($)"
            },
            "principal": 25000.000000,
            "approvedPrincipal": 25000.000000,
            "proposedPrincipal": 25000.000000,
            "termFrequency": 12,
            "termPeriodFrequencyType": {
                "id": 2,
                "code": "termFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "numberOfRepayments": 12,
            "repaymentEvery": 1,
            "repaymentFrequencyType": {
                "id": 2,
                "code": "repaymentFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "interestRatePerPeriod": 18.700000,
            "interestRateFrequencyType": {
                "id": 3,
                "code": "interestRateFrequency.periodFrequencyType.years",
                "value": "Per year"
            },
            "annualInterestRate": 18.700000,
            "isFloatingInterestRate": false,
            "interestRateDifferential": 0.0,
            "amortizationType": {
                "id": 1,
                "code": "amortizationType.equal.installments",
                "value": "Equal installments"
            },
            "interestType": {
                "id": 0,
                "code": "interestType.declining.balance",
                "value": "Declining Balance"
            },
            "interestCalculationPeriodType": {
                "id": 0,
                "code": "interestCalculationPeriodType.daily",
                "value": "Daily"
            },
            "allowPartialPeriodInterestCalcualtion": false,
            "inArrearsTolerance": 0.0,
            "transactionProcessingStrategyId": 1,
            "transactionProcessingStrategyName": "Penalties, Fees, Interest, Principal order",
            "graceOnPrincipalPayment": 0,
            "recurringMoratoriumOnPrincipalPeriods": 0,
            "graceOnInterestPayment": 0,
            "graceOnInterestCharged": 0,
            "graceOnArrearsAgeing": 1,
            "syncDisbursementWithMeeting": false,
            "timeline": {
                "submittedOnDate": [
                    2020,
                    9,
                    25
                ],
                "submittedByUsername": "mifos",
                "submittedByFirstname": "App",
                "submittedByLastname": "Administrator",
                "approvedOnDateTime": "",
                "expectedDisbursementDate": [
                    2020,
                    9,
                    28
                ],
                "expectedDisbursementDateTime": "9/28/20",
                "expectedMaturityDate": [
                    2021,
                    9,
                    28
                ]
            },
            "fixedEmiAmount": 0.0,
            "maxOutstandingLoanBalance": 0.0,
            "topupAmount": 0.0,
            "feeChargesAtDisbursementCharged": 0.000000,
            "totalOverpaid": 0.0,
            "loanCounter": 0,
            "loanProductCounter": 0,
            "multiDisburseLoan": false,
            "canDefineInstallmentAmount": false,
            "canDisburse": false,
            "canUseForTopup": false,
            "isTopup": false,
            "closureLoanId": 0,
            "inArrears": false,
            "isNPA": false,
            "daysInMonthType": {
                "id": 30,
                "code": "DaysInMonthType.days360",
                "value": "30 Days"
            },
            "daysInYearType": {
                "id": 360,
                "code": "DaysInYearType.days360",
                "value": "360 Days"
            },
            "isInterestRecalculationEnabled": false,
            "createStandingInstructionAtDisbursement": false,
            "isVariableInstallmentsAllowed": false,
            "minimumGap": 0,
            "maximumGap": 0,
            "isEqualAmortization": false,
            "taxes": [
                {
                    "loanId": 13981,
                    "amount": 415.804800,
                    "loanProductTaxComponent": {
                        "loanProductId": 17,
                        "percentage": 16.000000,
                        "taxComponent": {
                            "id": 2,
                            "percentage": 16.000000,
                            "name": "IVA Interes dev (Individual)",
                            "debitAccountType": {
                                "id": 1,
                                "code": "accountType.asset",
                                "value": "ASSET"
                            },
                            "debitAccount": {
                                "id": 126,
                                "name": "IVA Intereses Deveng. P/Cobrar Vigente Individual",
                                "parentId": 0,
                                "glCode": "1304-001-002",
                                "disabled": false,
                                "manualEntriesAllowed": false,
                                "type": null,
                                "usage": null,
                                "description": null,
                                "nameDecorated": null,
                                "tagId": null,
                                "organizationRunningBalance": 0,
                                "accountTypeOptions": null,
                                "usageOptions": null,
                                "assetHeaderAccountOptions": null,
                                "liabilityHeaderAccountOptions": null,
                                "equityHeaderAccountOptions": null,
                                "incomeHeaderAccountOptions": null,
                                "expenseHeaderAccountOptions": null,
                                "allowedAssetsTagOptions": null,
                                "allowedLiabilitiesTagOptions": null,
                                "allowedEquityTagOptions": null,
                                "allowedIncomeTagOptions": null,
                                "allowedExpensesTagOptions": null
                            },
                            "creditAccountType": {
                                "id": 2,
                                "code": "accountType.liability",
                                "value": "LIABILITY"
                            },
                            "creditAccount": {
                                "id": 44,
                                "name": "IVA Devengado",
                                "parentId": 0,
                                "glCode": "2303-004-008",
                                "disabled": false,
                                "manualEntriesAllowed": false,
                                "type": null,
                                "usage": null,
                                "description": null,
                                "nameDecorated": null,
                                "tagId": null,
                                "organizationRunningBalance": 0,
                                "accountTypeOptions": null,
                                "usageOptions": null,
                                "assetHeaderAccountOptions": null,
                                "liabilityHeaderAccountOptions": null,
                                "equityHeaderAccountOptions": null,
                                "incomeHeaderAccountOptions": null,
                                "expenseHeaderAccountOptions": null,
                                "allowedAssetsTagOptions": null,
                                "allowedLiabilitiesTagOptions": null,
                                "allowedEquityTagOptions": null,
                                "allowedIncomeTagOptions": null,
                                "allowedExpensesTagOptions": null
                            },
                            "startDate": [
                                2019,
                                4,
                                23
                            ],
                            "taxComponentHistories": [
                                {
                                    "percentage": 0.0,
                                    "startDate": null,
                                    "endDate": null
                                }
                            ],
                            "glAccountOptions": null,
                            "glAccountTypeOptions": null
                        }
                    }
                }
            ]
        },
        {
            "id": 13979,
            "accountNo": "000013979",
            "status": {
                "id": 300,
                "code": "loanStatusType.active",
                "value": "Active",
                "pendingApproval": false,
                "waitingForDisbursal": false,
                "active": true,
                "closedObligationsMet": false,
                "closedWrittenOff": false,
                "closedRescheduled": false,
                "closed": false,
                "overpaid": false
            },
            "clientId": 5,
            "clientAccountNo": "000000005",
            "clientName": "Agustin Palacios  Aguado",
            "clientOfficeId": 44,
            "groupId": 0,
            "loanProductId": 19,
            "loanProductName": "CREDITO SOLIDARIO",
            "loanProductDescription": "CREDITO SOLIDARIO",
            "isLoanProductLinkedToFloatingRate": false,
            "fundId": 2,
            "fundName": "BAJIO",
            "bankId": 0,
            "bankAccountId": 0,
            "paymentTypeId": 0,
            "loanPurposeId": 21,
            "loanPurposeName": "ADQUIRIR O COMPRAR MERCANCIA",
            "loanOfficerId": 0,
            "loanType": {
                "id": 1,
                "code": "accountType.individual",
                "value": "Individual"
            },
            "currency": {
                "code": "MXN",
                "name": "Mexican Peso",
                "decimalPlaces": 2,
                "inMultiplesOf": 1,
                "displaySymbol": "$",
                "nameCode": "currency.MXN",
                "displayLabel": "Mexican Peso ($)"
            },
            "principal": 15000.000000,
            "approvedPrincipal": 15000.000000,
            "proposedPrincipal": 15000.000000,
            "termFrequency": 16,
            "termPeriodFrequencyType": {
                "id": 1,
                "code": "termFrequency.periodFrequencyType.weeks",
                "value": "Weeks"
            },
            "numberOfRepayments": 16,
            "repaymentEvery": 1,
            "repaymentFrequencyType": {
                "id": 1,
                "code": "repaymentFrequency.periodFrequencyType.weeks",
                "value": "Weeks"
            },
            "interestRatePerPeriod": 91.210000,
            "interestRateFrequencyType": {
                "id": 3,
                "code": "interestRateFrequency.periodFrequencyType.years",
                "value": "Per year"
            },
            "annualInterestRate": 91.210000,
            "isFloatingInterestRate": false,
            "interestRateDifferential": 0.0,
            "amortizationType": {
                "id": 1,
                "code": "amortizationType.equal.installments",
                "value": "Equal installments"
            },
            "interestType": {
                "id": 0,
                "code": "interestType.declining.balance",
                "value": "Declining Balance"
            },
            "interestCalculationPeriodType": {
                "id": 0,
                "code": "interestCalculationPeriodType.daily",
                "value": "Daily"
            },
            "allowPartialPeriodInterestCalcualtion": false,
            "inArrearsTolerance": 0.000000,
            "transactionProcessingStrategyId": 1,
            "transactionProcessingStrategyName": "Penalties, Fees, Interest, Principal order",
            "graceOnPrincipalPayment": 0,
            "recurringMoratoriumOnPrincipalPeriods": 0,
            "graceOnInterestPayment": 0,
            "graceOnInterestCharged": 0,
            "graceOnArrearsAgeing": 1,
            "syncDisbursementWithMeeting": false,
            "timeline": {
                "submittedOnDate": [
                    2020,
                    9,
                    17
                ],
                "submittedByUsername": "mifos",
                "submittedByFirstname": "App",
                "submittedByLastname": "Administrator",
                "approvedOnDate": [
                    2020,
                    9,
                    17
                ],
                "approvedOnDateTime": "9/17/20",
                "approvedByUsername": "mifos",
                "approvedByFirstname": "App",
                "approvedByLastname": "Administrator",
                "expectedDisbursementDate": [
                    2020,
                    9,
                    17
                ],
                "expectedDisbursementDateTime": "9/17/20",
                "actualDisbursementDate": [
                    2020,
                    9,
                    17
                ],
                "disbursedByUsername": "mifos",
                "disbursedByFirstname": "App",
                "disbursedByLastname": "Administrator",
                "expectedMaturityDate": [
                    2021,
                    1,
                    7
                ]
            },
            "summary": {
                "currency": {
                    "code": "MXN",
                    "name": "Mexican Peso",
                    "decimalPlaces": 2,
                    "inMultiplesOf": 1,
                    "displaySymbol": "$",
                    "nameCode": "currency.MXN",
                    "displayLabel": "Mexican Peso ($)"
                },
                "principalDisbursed": 15000.000000,
                "principalPaid": 0.000000,
                "principalWrittenOff": 0.000000,
                "principalOutstanding": 15000.000000,
                "principalOverdue": 0.0,
                "interestCharged": 2348.350000,
                "interestPaid": 0.000000,
                "interestWaived": 2348.350000,
                "interestWrittenOff": 0.000000,
                "interestOutstanding": 0.000000,
                "interestOverdue": 0.0,
                "feeChargesCharged": 0.000000,
                "feeChargesDueAtDisbursementCharged": 0.000000,
                "feeChargesPaid": 0.000000,
                "feeChargesWaived": 0.000000,
                "feeChargesWrittenOff": 0.000000,
                "feeChargesOutstanding": 0.000000,
                "feeChargesOverdue": 0.0,
                "penaltyChargesCharged": 0.000000,
                "penaltyChargesPaid": 0.000000,
                "penaltyChargesWaived": 0.000000,
                "penaltyChargesWrittenOff": 0.000000,
                "penaltyChargesOutstanding": 0.000000,
                "penaltyChargesOverdue": 0.0,
                "totalExpectedRepayment": 17724.090000,
                "totalRepayment": 0.000000,
                "totalExpectedCostOfLoan": 2348.350000,
                "totalCostOfLoan": 0.000000,
                "totalWaived": 2724.086000,
                "totalWrittenOff": 0.000000,
                "totalOutstanding": 15375.740000,
                "totalOverdue": 0.0,
                "overdueSinceDate": null,
                "writeoffReasonId": 0,
                "writeoffReason": null
            },
            "fixedEmiAmount": 0.0,
            "maxOutstandingLoanBalance": 0.0,
            "topupAmount": 0.0,
            "feeChargesAtDisbursementCharged": 0.000000,
            "totalOverpaid": 0.0,
            "loanCounter": 4,
            "loanProductCounter": 1,
            "multiDisburseLoan": false,
            "canDefineInstallmentAmount": false,
            "canDisburse": false,
            "canUseForTopup": false,
            "isTopup": false,
            "closureLoanId": 0,
            "inArrears": false,
            "isNPA": false,
            "daysInMonthType": {
                "id": 1,
                "code": "DaysInMonthType.actual",
                "value": "Actual"
            },
            "daysInYearType": {
                "id": 364,
                "code": "DaysInYearType.days364",
                "value": "364 Days"
            },
            "isInterestRecalculationEnabled": false,
            "createStandingInstructionAtDisbursement": false,
            "isVariableInstallmentsAllowed": false,
            "minimumGap": 0,
            "maximumGap": 0,
            "isEqualAmortization": false,
            "taxes": [
                {
                    "loanId": 13979,
                    "amount": 375.736000,
                    "loanProductTaxComponent": {
                        "loanProductId": 19,
                        "percentage": 16.000000,
                        "taxComponent": {
                            "id": 5,
                            "percentage": 16.000000,
                            "name": "IVA Interes dev (Grupales)",
                            "debitAccountType": {
                                "id": 1,
                                "code": "accountType.asset",
                                "value": "ASSET"
                            },
                            "debitAccount": {
                                "id": 12,
                                "name": "IVA Intereses Deveng. P/Cobrar Vigente Grupal",
                                "parentId": 0,
                                "glCode": "1304-001-001",
                                "disabled": false,
                                "manualEntriesAllowed": false,
                                "type": null,
                                "usage": null,
                                "description": null,
                                "nameDecorated": null,
                                "tagId": null,
                                "organizationRunningBalance": 0,
                                "accountTypeOptions": null,
                                "usageOptions": null,
                                "assetHeaderAccountOptions": null,
                                "liabilityHeaderAccountOptions": null,
                                "equityHeaderAccountOptions": null,
                                "incomeHeaderAccountOptions": null,
                                "expenseHeaderAccountOptions": null,
                                "allowedAssetsTagOptions": null,
                                "allowedLiabilitiesTagOptions": null,
                                "allowedEquityTagOptions": null,
                                "allowedIncomeTagOptions": null,
                                "allowedExpensesTagOptions": null
                            },
                            "creditAccountType": {
                                "id": 2,
                                "code": "accountType.liability",
                                "value": "LIABILITY"
                            },
                            "creditAccount": {
                                "id": 44,
                                "name": "IVA Devengado",
                                "parentId": 0,
                                "glCode": "2303-004-008",
                                "disabled": false,
                                "manualEntriesAllowed": false,
                                "type": null,
                                "usage": null,
                                "description": null,
                                "nameDecorated": null,
                                "tagId": null,
                                "organizationRunningBalance": 0,
                                "accountTypeOptions": null,
                                "usageOptions": null,
                                "assetHeaderAccountOptions": null,
                                "liabilityHeaderAccountOptions": null,
                                "equityHeaderAccountOptions": null,
                                "incomeHeaderAccountOptions": null,
                                "expenseHeaderAccountOptions": null,
                                "allowedAssetsTagOptions": null,
                                "allowedLiabilitiesTagOptions": null,
                                "allowedEquityTagOptions": null,
                                "allowedIncomeTagOptions": null,
                                "allowedExpensesTagOptions": null
                            },
                            "startDate": [
                                2019,
                                4,
                                22
                            ],
                            "taxComponentHistories": [
                                {
                                    "percentage": 0.0,
                                    "startDate": null,
                                    "endDate": null
                                }
                            ],
                            "glAccountOptions": null,
                            "glAccountTypeOptions": null
                        }
                    }
                }
            ]
        },
        {
            "id": 689,
            "accountNo": "000000689",
            "status": {
                "id": 300,
                "code": "loanStatusType.active",
                "value": "Active",
                "pendingApproval": false,
                "waitingForDisbursal": false,
                "active": true,
                "closedObligationsMet": false,
                "closedWrittenOff": false,
                "closedRescheduled": false,
                "closed": false,
                "overpaid": false
            },
            "clientId": 5,
            "clientAccountNo": "000000005",
            "clientName": "Agustin Palacios  Aguado",
            "clientOfficeId": 44,
            "groupId": 0,
            "loanProductId": 1,
            "loanProductName": "TU NEGOCIO CON CONSERVA",
            "loanProductDescription": "SIMPLE",
            "isLoanProductLinkedToFloatingRate": false,
            "fundId": 1,
            "fundName": "RECURSOS PROPIOS",
            "bankId": 0,
            "bankAccountId": 0,
            "paymentTypeId": 0,
            "loanPurposeId": 0,
            "loanOfficerId": 1,
            "loanOfficerName": "ZEMPOALTECATL SOLIS, BRANDON RENE",
            "loanType": {
                "id": 1,
                "code": "accountType.individual",
                "value": "Individual"
            },
            "currency": {
                "code": "MXN",
                "name": "Mexican Peso",
                "decimalPlaces": 2,
                "inMultiplesOf": 1,
                "displaySymbol": "$",
                "nameCode": "currency.MXN",
                "displayLabel": "Mexican Peso ($)"
            },
            "principal": 100001.000000,
            "approvedPrincipal": 100001.000000,
            "proposedPrincipal": 100001.000000,
            "termFrequency": 6,
            "termPeriodFrequencyType": {
                "id": 2,
                "code": "termFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "numberOfRepayments": 6,
            "repaymentEvery": 1,
            "repaymentFrequencyType": {
                "id": 2,
                "code": "repaymentFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "interestRatePerPeriod": 84.120000,
            "interestRateFrequencyType": {
                "id": 3,
                "code": "interestRateFrequency.periodFrequencyType.years",
                "value": "Per year"
            },
            "annualInterestRate": 84.120000,
            "isFloatingInterestRate": false,
            "interestRateDifferential": 0.0,
            "amortizationType": {
                "id": 1,
                "code": "amortizationType.equal.installments",
                "value": "Equal installments"
            },
            "interestType": {
                "id": 0,
                "code": "interestType.declining.balance",
                "value": "Declining Balance"
            },
            "interestCalculationPeriodType": {
                "id": 0,
                "code": "interestCalculationPeriodType.daily",
                "value": "Daily"
            },
            "allowPartialPeriodInterestCalcualtion": false,
            "inArrearsTolerance": 0.000000,
            "transactionProcessingStrategyId": 1,
            "transactionProcessingStrategyName": "Penalties, Fees, Interest, Principal order",
            "graceOnPrincipalPayment": 0,
            "recurringMoratoriumOnPrincipalPeriods": 0,
            "graceOnInterestPayment": 0,
            "graceOnInterestCharged": 0,
            "graceOnArrearsAgeing": 0,
            "syncDisbursementWithMeeting": false,
            "timeline": {
                "submittedOnDate": [
                    2020,
                    5,
                    11
                ],
                "submittedByUsername": "ajaguilar@grupoconserva.mx",
                "submittedByFirstname": "ALEJANDRO",
                "submittedByLastname": "JIMENEZ AGUILAR",
                "approvedOnDate": [
                    2020,
                    5,
                    12
                ],
                "approvedOnDateTime": "5/12/20",
                "approvedByUsername": "ajaguilar@grupoconserva.mx",
                "approvedByFirstname": "ALEJANDRO",
                "approvedByLastname": "JIMENEZ AGUILAR",
                "expectedDisbursementDate": [
                    2020,
                    5,
                    12
                ],
                "expectedDisbursementDateTime": "5/12/20",
                "actualDisbursementDate": [
                    2020,
                    5,
                    12
                ],
                "disbursedByUsername": "ajaguilar@grupoconserva.mx",
                "disbursedByFirstname": "ALEJANDRO",
                "disbursedByLastname": "JIMENEZ AGUILAR",
                "closedOnDate": [
                    2020,
                    9,
                    17
                ],
                "expectedMaturityDate": [
                    2020,
                    11,
                    12
                ]
            },
            "summary": {
                "currency": {
                    "code": "MXN",
                    "name": "Mexican Peso",
                    "decimalPlaces": 2,
                    "inMultiplesOf": 1,
                    "displaySymbol": "$",
                    "nameCode": "currency.MXN",
                    "displayLabel": "Mexican Peso ($)"
                },
                "principalDisbursed": 100001.000000,
                "principalPaid": 28050.750000,
                "principalWrittenOff": 0.000000,
                "principalOutstanding": 71950.250000,
                "principalOverdue": 32925.930000,
                "interestCharged": 26297.580000,
                "interestPaid": 13263.150000,
                "interestWaived": 0.000000,
                "interestWrittenOff": 0.000000,
                "interestOutstanding": 13034.430000,
                "interestOverdue": 9060.410000,
                "feeChargesCharged": 216.000000,
                "feeChargesDueAtDisbursementCharged": 0.000000,
                "feeChargesPaid": 72.000000,
                "feeChargesWaived": 0.000000,
                "feeChargesWrittenOff": 0.000000,
                "feeChargesOutstanding": 144.000000,
                "feeChargesOverdue": 72.000000,
                "penaltyChargesCharged": 0.000000,
                "penaltyChargesPaid": 0.000000,
                "penaltyChargesWaived": 0.000000,
                "penaltyChargesWrittenOff": 0.000000,
                "penaltyChargesOutstanding": 0.000000,
                "penaltyChargesOverdue": 0.000000,
                "totalExpectedRepayment": 130722.190000,
                "totalRepayment": 43508.000000,
                "totalExpectedCostOfLoan": 26513.580000,
                "totalCostOfLoan": 13335.150000,
                "totalWaived": 0.000000,
                "totalWrittenOff": 0.000000,
                "totalOutstanding": 87214.190000,
                "totalOverdue": 43508.005600,
                "overdueSinceDate": [
                    2020,
                    8,
                    12
                ],
                "writeoffReasonId": 0,
                "writeoffReason": null
            },
            "fixedEmiAmount": 0.0,
            "maxOutstandingLoanBalance": 0.0,
            "topupAmount": 0.0,
            "feeChargesAtDisbursementCharged": 0.000000,
            "totalOverpaid": 0.0,
            "loanCounter": 0,
            "loanProductCounter": 0,
            "multiDisburseLoan": false,
            "canDefineInstallmentAmount": false,
            "canDisburse": false,
            "canUseForTopup": false,
            "isTopup": false,
            "closureLoanId": 0,
            "inArrears": true,
            "isNPA": false,
            "daysInMonthType": {
                "id": 30,
                "code": "DaysInMonthType.days360",
                "value": "30 Days"
            },
            "daysInYearType": {
                "id": 360,
                "code": "DaysInYearType.days360",
                "value": "360 Days"
            },
            "isInterestRecalculationEnabled": false,
            "createStandingInstructionAtDisbursement": false,
            "isVariableInstallmentsAllowed": false,
            "minimumGap": 0,
            "maximumGap": 0,
            "isEqualAmortization": false
        },
        {
            "id": 315,
            "accountNo": "000000315",
            "status": {
                "id": 600,
                "code": "loanStatusType.closed.obligations.met",
                "value": "Closed (obligations met)",
                "pendingApproval": false,
                "waitingForDisbursal": false,
                "active": false,
                "closedObligationsMet": true,
                "closedWrittenOff": false,
                "closedRescheduled": false,
                "closed": true,
                "overpaid": false
            },
            "clientId": 5,
            "clientAccountNo": "000000005",
            "clientName": "Agustin Palacios  Aguado",
            "clientOfficeId": 44,
            "groupId": 0,
            "loanProductId": 1,
            "loanProductName": "TU NEGOCIO CON CONSERVA",
            "loanProductDescription": "SIMPLE",
            "isLoanProductLinkedToFloatingRate": false,
            "fundId": 1,
            "fundName": "RECURSOS PROPIOS",
            "bankId": 0,
            "bankAccountId": 0,
            "paymentTypeId": 0,
            "loanPurposeId": 0,
            "loanOfficerId": 1,
            "loanOfficerName": "ZEMPOALTECATL SOLIS, BRANDON RENE",
            "loanType": {
                "id": 1,
                "code": "accountType.individual",
                "value": "Individual"
            },
            "currency": {
                "code": "MXN",
                "name": "Mexican Peso",
                "decimalPlaces": 0,
                "inMultiplesOf": 1,
                "displaySymbol": "$",
                "nameCode": "currency.MXN",
                "displayLabel": "Mexican Peso ($)"
            },
            "principal": 50000.000000,
            "approvedPrincipal": 50000.000000,
            "proposedPrincipal": 50000.000000,
            "termFrequency": 4,
            "termPeriodFrequencyType": {
                "id": 2,
                "code": "termFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "numberOfRepayments": 4,
            "repaymentEvery": 1,
            "repaymentFrequencyType": {
                "id": 2,
                "code": "repaymentFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "interestRatePerPeriod": 87.500000,
            "interestRateFrequencyType": {
                "id": 3,
                "code": "interestRateFrequency.periodFrequencyType.years",
                "value": "Per year"
            },
            "annualInterestRate": 87.500000,
            "isFloatingInterestRate": false,
            "interestRateDifferential": 0.0,
            "amortizationType": {
                "id": 1,
                "code": "amortizationType.equal.installments",
                "value": "Equal installments"
            },
            "interestType": {
                "id": 0,
                "code": "interestType.declining.balance",
                "value": "Declining Balance"
            },
            "interestCalculationPeriodType": {
                "id": 0,
                "code": "interestCalculationPeriodType.daily",
                "value": "Daily"
            },
            "allowPartialPeriodInterestCalcualtion": false,
            "inArrearsTolerance": 0.000000,
            "transactionProcessingStrategyId": 1,
            "transactionProcessingStrategyName": "Penalties, Fees, Interest, Principal order",
            "graceOnPrincipalPayment": 0,
            "recurringMoratoriumOnPrincipalPeriods": 0,
            "graceOnInterestPayment": 0,
            "graceOnInterestCharged": 0,
            "graceOnArrearsAgeing": 0,
            "syncDisbursementWithMeeting": false,
            "timeline": {
                "submittedOnDate": [
                    2020,
                    1,
                    8
                ],
                "submittedByUsername": "brsolis@grupoconserva.mx",
                "submittedByFirstname": "Rene",
                "submittedByLastname": "Solis",
                "approvedOnDate": [
                    2020,
                    1,
                    8
                ],
                "approvedOnDateTime": "1/8/20",
                "approvedByUsername": "shbalderas@grupoconserva.mx",
                "approvedByFirstname": "Simon",
                "approvedByLastname": "Herrera Balderas ",
                "expectedDisbursementDate": [
                    2020,
                    1,
                    8
                ],
                "expectedDisbursementDateTime": "1/8/20",
                "actualDisbursementDate": [
                    2020,
                    1,
                    8
                ],
                "disbursedByUsername": "shbalderas@grupoconserva.mx",
                "disbursedByFirstname": "Simon",
                "disbursedByLastname": "Herrera Balderas ",
                "closedOnDate": [
                    2020,
                    5,
                    11
                ],
                "expectedMaturityDate": [
                    2020,
                    5,
                    8
                ]
            },
            "summary": {
                "currency": {
                    "code": "MXN",
                    "name": "Mexican Peso",
                    "decimalPlaces": 0,
                    "inMultiplesOf": 1,
                    "displaySymbol": "$",
                    "nameCode": "currency.MXN",
                    "displayLabel": "Mexican Peso ($)"
                },
                "principalDisbursed": 50000.000000,
                "principalPaid": 50000.000000,
                "principalWrittenOff": 0.000000,
                "principalOutstanding": 0.000000,
                "principalOverdue": 0.0,
                "interestCharged": 9619.000000,
                "interestPaid": 9619.000000,
                "interestWaived": 0.000000,
                "interestWrittenOff": 0.000000,
                "interestOutstanding": 0.000000,
                "interestOverdue": 0.0,
                "feeChargesCharged": 144.000000,
                "feeChargesDueAtDisbursementCharged": 0.000000,
                "feeChargesPaid": 144.000000,
                "feeChargesWaived": 0.000000,
                "feeChargesWrittenOff": 0.000000,
                "feeChargesOutstanding": 0.000000,
                "feeChargesOverdue": 0.0,
                "penaltyChargesCharged": 0.000000,
                "penaltyChargesPaid": 0.000000,
                "penaltyChargesWaived": 0.000000,
                "penaltyChargesWrittenOff": 0.000000,
                "penaltyChargesOutstanding": 0.000000,
                "penaltyChargesOverdue": 0.0,
                "totalExpectedRepayment": 61302.000000,
                "totalRepayment": 61302.000000,
                "totalExpectedCostOfLoan": 9763.000000,
                "totalCostOfLoan": 9763.000000,
                "totalWaived": 0.000000,
                "totalWrittenOff": 0.000000,
                "totalOutstanding": 0.000000,
                "totalOverdue": 0.0,
                "overdueSinceDate": null,
                "writeoffReasonId": 0,
                "writeoffReason": null
            },
            "fixedEmiAmount": 0.0,
            "maxOutstandingLoanBalance": 0.0,
            "topupAmount": 0.0,
            "feeChargesAtDisbursementCharged": 0.000000,
            "totalOverpaid": 0.0,
            "loanCounter": 3,
            "loanProductCounter": 3,
            "multiDisburseLoan": false,
            "canDefineInstallmentAmount": false,
            "canDisburse": false,
            "canUseForTopup": false,
            "isTopup": false,
            "closureLoanId": 0,
            "inArrears": false,
            "isNPA": false,
            "daysInMonthType": {
                "id": 30,
                "code": "DaysInMonthType.days360",
                "value": "30 Days"
            },
            "daysInYearType": {
                "id": 360,
                "code": "DaysInYearType.days360",
                "value": "360 Days"
            },
            "isInterestRecalculationEnabled": false,
            "createStandingInstructionAtDisbursement": false,
            "isVariableInstallmentsAllowed": false,
            "minimumGap": 0,
            "maximumGap": 0,
            "isEqualAmortization": false
        },
        {
            "id": 53,
            "accountNo": "000000053",
            "status": {
                "id": 600,
                "code": "loanStatusType.closed.obligations.met",
                "value": "Closed (obligations met)",
                "pendingApproval": false,
                "waitingForDisbursal": false,
                "active": false,
                "closedObligationsMet": true,
                "closedWrittenOff": false,
                "closedRescheduled": false,
                "closed": true,
                "overpaid": false
            },
            "clientId": 5,
            "clientAccountNo": "000000005",
            "clientName": "Agustin Palacios  Aguado",
            "clientOfficeId": 44,
            "groupId": 0,
            "loanProductId": 1,
            "loanProductName": "TU NEGOCIO CON CONSERVA",
            "loanProductDescription": "SIMPLE",
            "isLoanProductLinkedToFloatingRate": false,
            "fundId": 1,
            "fundName": "RECURSOS PROPIOS",
            "bankId": 0,
            "bankAccountId": 0,
            "paymentTypeId": 0,
            "loanPurposeId": 21,
            "loanPurposeName": "ADQUIRIR O COMPRAR MERCANCIA",
            "loanOfficerId": 1,
            "loanOfficerName": "ZEMPOALTECATL SOLIS, BRANDON RENE",
            "loanType": {
                "id": 1,
                "code": "accountType.individual",
                "value": "Individual"
            },
            "currency": {
                "code": "MXN",
                "name": "Mexican Peso",
                "decimalPlaces": 0,
                "inMultiplesOf": 1,
                "displaySymbol": "$",
                "nameCode": "currency.MXN",
                "displayLabel": "Mexican Peso ($)"
            },
            "principal": 62000.000000,
            "approvedPrincipal": 62000.000000,
            "proposedPrincipal": 62000.000000,
            "termFrequency": 4,
            "termPeriodFrequencyType": {
                "id": 2,
                "code": "termFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "numberOfRepayments": 4,
            "repaymentEvery": 1,
            "repaymentFrequencyType": {
                "id": 2,
                "code": "repaymentFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "interestRatePerPeriod": 87.500000,
            "interestRateFrequencyType": {
                "id": 3,
                "code": "interestRateFrequency.periodFrequencyType.years",
                "value": "Per year"
            },
            "annualInterestRate": 87.500000,
            "isFloatingInterestRate": false,
            "interestRateDifferential": 0.0,
            "amortizationType": {
                "id": 1,
                "code": "amortizationType.equal.installments",
                "value": "Equal installments"
            },
            "interestType": {
                "id": 0,
                "code": "interestType.declining.balance",
                "value": "Declining Balance"
            },
            "interestCalculationPeriodType": {
                "id": 0,
                "code": "interestCalculationPeriodType.daily",
                "value": "Daily"
            },
            "allowPartialPeriodInterestCalcualtion": false,
            "inArrearsTolerance": 0.000000,
            "transactionProcessingStrategyId": 1,
            "transactionProcessingStrategyName": "Penalties, Fees, Interest, Principal order",
            "graceOnPrincipalPayment": 0,
            "recurringMoratoriumOnPrincipalPeriods": 0,
            "graceOnInterestPayment": 0,
            "graceOnInterestCharged": 0,
            "graceOnArrearsAgeing": 0,
            "expectedFirstRepaymentOnDate": [
                2019,
                10,
                1
            ],
            "syncDisbursementWithMeeting": false,
            "timeline": {
                "submittedOnDate": [
                    2019,
                    8,
                    29
                ],
                "submittedByUsername": "shbalderas@grupoconserva.mx",
                "submittedByFirstname": "Simon",
                "submittedByLastname": "Herrera Balderas ",
                "approvedOnDate": [
                    2019,
                    8,
                    29
                ],
                "approvedOnDateTime": "8/29/19",
                "approvedByUsername": "shbalderas@grupoconserva.mx",
                "approvedByFirstname": "Simon",
                "approvedByLastname": "Herrera Balderas ",
                "expectedDisbursementDate": [
                    2019,
                    9,
                    3
                ],
                "expectedDisbursementDateTime": "9/3/19",
                "actualDisbursementDate": [
                    2019,
                    9,
                    3
                ],
                "disbursedByUsername": "mifos",
                "disbursedByFirstname": "App",
                "disbursedByLastname": "Administrator",
                "closedOnDate": [
                    2020,
                    1,
                    7
                ],
                "expectedMaturityDate": [
                    2020,
                    1,
                    7
                ]
            },
            "summary": {
                "currency": {
                    "code": "MXN",
                    "name": "Mexican Peso",
                    "decimalPlaces": 0,
                    "inMultiplesOf": 1,
                    "displaySymbol": "$",
                    "nameCode": "currency.MXN",
                    "displayLabel": "Mexican Peso ($)"
                },
                "principalDisbursed": 62000.000000,
                "principalPaid": 62000.000000,
                "principalWrittenOff": 0.000000,
                "principalOutstanding": 0.000000,
                "principalOverdue": 0.0,
                "interestCharged": 11886.000000,
                "interestPaid": 11886.000000,
                "interestWaived": 0.000000,
                "interestWrittenOff": 0.000000,
                "interestOutstanding": 0.000000,
                "interestOverdue": 0.0,
                "feeChargesCharged": 144.000000,
                "feeChargesDueAtDisbursementCharged": 0.000000,
                "feeChargesPaid": 144.000000,
                "feeChargesWaived": 0.000000,
                "feeChargesWrittenOff": 0.000000,
                "feeChargesOutstanding": 0.000000,
                "feeChargesOverdue": 0.0,
                "penaltyChargesCharged": 0.000000,
                "penaltyChargesPaid": 0.000000,
                "penaltyChargesWaived": 0.000000,
                "penaltyChargesWrittenOff": 0.000000,
                "penaltyChargesOutstanding": 0.000000,
                "penaltyChargesOverdue": 0.0,
                "totalExpectedRepayment": 75932.000000,
                "totalRepayment": 75932.000000,
                "totalExpectedCostOfLoan": 12030.000000,
                "totalCostOfLoan": 12030.000000,
                "totalWaived": 0.000000,
                "totalWrittenOff": 0.000000,
                "totalOutstanding": 0.000000,
                "totalOverdue": 0.0,
                "overdueSinceDate": null,
                "writeoffReasonId": 0,
                "writeoffReason": null
            },
            "fixedEmiAmount": 0.0,
            "maxOutstandingLoanBalance": 0.0,
            "topupAmount": 0.0,
            "interestRecalculationData": {
                "id": 51,
                "loanId": 53,
                "interestRecalculationCompoundingType": {
                    "id": 0,
                    "code": "interestRecalculationCompoundingMethod.none",
                    "value": "None"
                },
                "rescheduleStrategyType": {
                    "id": 3,
                    "code": "loanRescheduleStrategyMethod.reduce.emi.amount",
                    "value": "Reduce EMI amount"
                },
                "calendarData": null,
                "recalculationRestFrequencyType": {
                    "id": 2,
                    "code": "interestRecalculationFrequencyType.daily",
                    "value": "Daily"
                },
                "recalculationRestFrequencyInterval": 1,
                "recalculationRestFrequencyNthDay": null,
                "recalculationRestFrequencyWeekday": null,
                "recalculationRestFrequencyOnDay": 0,
                "recalculationCompoundingFrequencyType": {
                    "id": 0,
                    "code": "interestRecalculationFrequencyType.invalid",
                    "value": "Invalid"
                },
                "recalculationCompoundingFrequencyInterval": 0,
                "recalculationCompoundingFrequencyNthDay": null,
                "recalculationCompoundingFrequencyWeekday": null,
                "recalculationCompoundingFrequencyOnDay": 0,
                "isCompoundingToBePostedAsTransaction": false,
                "compoundingCalendarData": null,
                "allowCompoundingOnEod": false
            },
            "feeChargesAtDisbursementCharged": 0.000000,
            "totalOverpaid": 0.0,
            "loanCounter": 2,
            "loanProductCounter": 2,
            "multiDisburseLoan": false,
            "canDefineInstallmentAmount": false,
            "canDisburse": false,
            "canUseForTopup": false,
            "isTopup": false,
            "closureLoanId": 0,
            "inArrears": false,
            "isNPA": false,
            "daysInMonthType": {
                "id": 30,
                "code": "DaysInMonthType.days360",
                "value": "30 Days"
            },
            "daysInYearType": {
                "id": 360,
                "code": "DaysInYearType.days360",
                "value": "360 Days"
            },
            "isInterestRecalculationEnabled": true,
            "createStandingInstructionAtDisbursement": false,
            "isVariableInstallmentsAllowed": false,
            "minimumGap": 0,
            "maximumGap": 0,
            "isEqualAmortization": false
        },
        {
            "id": 52,
            "accountNo": "000000052",
            "status": {
                "id": 500,
                "code": "loanStatusType.rejected",
                "value": "Rejected",
                "pendingApproval": false,
                "waitingForDisbursal": false,
                "active": false,
                "closedObligationsMet": false,
                "closedWrittenOff": false,
                "closedRescheduled": false,
                "closed": false,
                "overpaid": false
            },
            "clientId": 5,
            "clientAccountNo": "000000005",
            "clientName": "Agustin Palacios  Aguado",
            "clientOfficeId": 44,
            "groupId": 0,
            "loanProductId": 1,
            "loanProductName": "TU NEGOCIO CON CONSERVA",
            "loanProductDescription": "SIMPLE",
            "isLoanProductLinkedToFloatingRate": false,
            "fundId": 1,
            "fundName": "RECURSOS PROPIOS",
            "bankId": 0,
            "bankAccountId": 0,
            "paymentTypeId": 0,
            "loanPurposeId": 21,
            "loanPurposeName": "ADQUIRIR O COMPRAR MERCANCIA",
            "loanOfficerId": 1,
            "loanOfficerName": "ZEMPOALTECATL SOLIS, BRANDON RENE",
            "loanType": {
                "id": 1,
                "code": "accountType.individual",
                "value": "Individual"
            },
            "currency": {
                "code": "MXN",
                "name": "Mexican Peso",
                "decimalPlaces": 0,
                "inMultiplesOf": 1,
                "displaySymbol": "$",
                "nameCode": "currency.MXN",
                "displayLabel": "Mexican Peso ($)"
            },
            "principal": 62000.000000,
            "approvedPrincipal": 62000.000000,
            "proposedPrincipal": 62000.000000,
            "termFrequency": 4,
            "termPeriodFrequencyType": {
                "id": 2,
                "code": "termFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "numberOfRepayments": 4,
            "repaymentEvery": 1,
            "repaymentFrequencyType": {
                "id": 2,
                "code": "repaymentFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "interestRatePerPeriod": 87.500000,
            "interestRateFrequencyType": {
                "id": 3,
                "code": "interestRateFrequency.periodFrequencyType.years",
                "value": "Per year"
            },
            "annualInterestRate": 87.500000,
            "isFloatingInterestRate": false,
            "interestRateDifferential": 0.0,
            "amortizationType": {
                "id": 1,
                "code": "amortizationType.equal.installments",
                "value": "Equal installments"
            },
            "interestType": {
                "id": 0,
                "code": "interestType.declining.balance",
                "value": "Declining Balance"
            },
            "interestCalculationPeriodType": {
                "id": 0,
                "code": "interestCalculationPeriodType.daily",
                "value": "Daily"
            },
            "allowPartialPeriodInterestCalcualtion": false,
            "inArrearsTolerance": 1.000000,
            "transactionProcessingStrategyId": 1,
            "transactionProcessingStrategyName": "Penalties, Fees, Interest, Principal order",
            "graceOnPrincipalPayment": 0,
            "recurringMoratoriumOnPrincipalPeriods": 0,
            "graceOnInterestPayment": 0,
            "graceOnInterestCharged": 0,
            "graceOnArrearsAgeing": 0,
            "expectedFirstRepaymentOnDate": [
                2019,
                10,
                7
            ],
            "syncDisbursementWithMeeting": false,
            "timeline": {
                "submittedOnDate": [
                    2019,
                    8,
                    29
                ],
                "submittedByUsername": "r.reyes@grupoconserva.mx",
                "submittedByFirstname": "ROBERTO",
                "submittedByLastname": "REYES DE LA VEGA",
                "rejectedOnDate": [
                    2019,
                    8,
                    29
                ],
                "rejectedByUsername": "r.reyes@grupoconserva.mx",
                "rejectedByFirstname": "ROBERTO",
                "rejectedByLastname": "REYES DE LA VEGA",
                "approvedOnDateTime": "",
                "expectedDisbursementDate": [
                    2019,
                    9,
                    2
                ],
                "expectedDisbursementDateTime": "9/2/19",
                "closedOnDate": [
                    2019,
                    8,
                    29
                ],
                "closedByUsername": "r.reyes@grupoconserva.mx",
                "closedByFirstname": "ROBERTO",
                "closedByLastname": "REYES DE LA VEGA",
                "expectedMaturityDate": [
                    2020,
                    1,
                    6
                ],
                "writeOffByUsername": "r.reyes@grupoconserva.mx",
                "writeOffByFirstname": "ROBERTO",
                "writeOffByLastname": "REYES DE LA VEGA"
            },
            "summary": {
                "currency": {
                    "code": "MXN",
                    "name": "Mexican Peso",
                    "decimalPlaces": 0,
                    "inMultiplesOf": 1,
                    "displaySymbol": "$",
                    "nameCode": "currency.MXN",
                    "displayLabel": "Mexican Peso ($)"
                },
                "principalDisbursed": 0.000000,
                "principalPaid": 0.000000,
                "principalWrittenOff": 0.000000,
                "principalOutstanding": 0.000000,
                "principalOverdue": 0.0,
                "interestCharged": 0.000000,
                "interestPaid": 0.000000,
                "interestWaived": 0.000000,
                "interestWrittenOff": 0.000000,
                "interestOutstanding": 0.000000,
                "interestOverdue": 0.0,
                "feeChargesCharged": 0.000000,
                "feeChargesDueAtDisbursementCharged": 0.000000,
                "feeChargesPaid": 0.000000,
                "feeChargesWaived": 0.000000,
                "feeChargesWrittenOff": 0.000000,
                "feeChargesOutstanding": 0.000000,
                "feeChargesOverdue": 0.0,
                "penaltyChargesCharged": 0.000000,
                "penaltyChargesPaid": 0.000000,
                "penaltyChargesWaived": 0.000000,
                "penaltyChargesWrittenOff": 0.000000,
                "penaltyChargesOutstanding": 0.000000,
                "penaltyChargesOverdue": 0.0,
                "totalExpectedRepayment": 960.000000,
                "totalRepayment": 0.000000,
                "totalExpectedCostOfLoan": 0.000000,
                "totalCostOfLoan": 0.000000,
                "totalWaived": 0.000000,
                "totalWrittenOff": 0.000000,
                "totalOutstanding": 960.000000,
                "totalOverdue": 0.0,
                "overdueSinceDate": null,
                "writeoffReasonId": 0,
                "writeoffReason": null
            },
            "fixedEmiAmount": 0.0,
            "maxOutstandingLoanBalance": 0.0,
            "topupAmount": 0.0,
            "interestRecalculationData": {
                "id": 50,
                "loanId": 52,
                "interestRecalculationCompoundingType": {
                    "id": 0,
                    "code": "interestRecalculationCompoundingMethod.none",
                    "value": "None"
                },
                "rescheduleStrategyType": {
                    "id": 3,
                    "code": "loanRescheduleStrategyMethod.reduce.emi.amount",
                    "value": "Reduce EMI amount"
                },
                "calendarData": null,
                "recalculationRestFrequencyType": {
                    "id": 2,
                    "code": "interestRecalculationFrequencyType.daily",
                    "value": "Daily"
                },
                "recalculationRestFrequencyInterval": 1,
                "recalculationRestFrequencyNthDay": null,
                "recalculationRestFrequencyWeekday": null,
                "recalculationRestFrequencyOnDay": 0,
                "recalculationCompoundingFrequencyType": {
                    "id": 0,
                    "code": "interestRecalculationFrequencyType.invalid",
                    "value": "Invalid"
                },
                "recalculationCompoundingFrequencyInterval": 0,
                "recalculationCompoundingFrequencyNthDay": null,
                "recalculationCompoundingFrequencyWeekday": null,
                "recalculationCompoundingFrequencyOnDay": 0,
                "isCompoundingToBePostedAsTransaction": false,
                "compoundingCalendarData": null,
                "allowCompoundingOnEod": false
            },
            "feeChargesAtDisbursementCharged": 0.000000,
            "totalOverpaid": 0.0,
            "loanCounter": 0,
            "loanProductCounter": 0,
            "multiDisburseLoan": false,
            "canDefineInstallmentAmount": false,
            "canDisburse": false,
            "canUseForTopup": false,
            "isTopup": false,
            "closureLoanId": 0,
            "inArrears": false,
            "isNPA": false,
            "daysInMonthType": {
                "id": 30,
                "code": "DaysInMonthType.days360",
                "value": "30 Days"
            },
            "daysInYearType": {
                "id": 360,
                "code": "DaysInYearType.days360",
                "value": "360 Days"
            },
            "isInterestRecalculationEnabled": true,
            "createStandingInstructionAtDisbursement": false,
            "isVariableInstallmentsAllowed": false,
            "minimumGap": 0,
            "maximumGap": 0,
            "isEqualAmortization": false
        },
        {
            "id": 47,
            "accountNo": "000000047",
            "status": {
                "id": 500,
                "code": "loanStatusType.rejected",
                "value": "Rejected",
                "pendingApproval": false,
                "waitingForDisbursal": false,
                "active": false,
                "closedObligationsMet": false,
                "closedWrittenOff": false,
                "closedRescheduled": false,
                "closed": false,
                "overpaid": false
            },
            "clientId": 5,
            "clientAccountNo": "000000005",
            "clientName": "Agustin Palacios  Aguado",
            "clientOfficeId": 44,
            "groupId": 0,
            "loanProductId": 1,
            "loanProductName": "TU NEGOCIO CON CONSERVA",
            "loanProductDescription": "SIMPLE",
            "isLoanProductLinkedToFloatingRate": false,
            "fundId": 1,
            "fundName": "RECURSOS PROPIOS",
            "bankId": 0,
            "bankAccountId": 0,
            "paymentTypeId": 0,
            "loanPurposeId": 21,
            "loanPurposeName": "ADQUIRIR O COMPRAR MERCANCIA",
            "loanOfficerId": 1,
            "loanOfficerName": "ZEMPOALTECATL SOLIS, BRANDON RENE",
            "loanType": {
                "id": 1,
                "code": "accountType.individual",
                "value": "Individual"
            },
            "currency": {
                "code": "MXN",
                "name": "Mexican Peso",
                "decimalPlaces": 0,
                "inMultiplesOf": 1,
                "displaySymbol": "$",
                "nameCode": "currency.MXN",
                "displayLabel": "Mexican Peso ($)"
            },
            "principal": 62000.000000,
            "approvedPrincipal": 62000.000000,
            "proposedPrincipal": 62000.000000,
            "termFrequency": 4,
            "termPeriodFrequencyType": {
                "id": 2,
                "code": "termFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "numberOfRepayments": 4,
            "repaymentEvery": 1,
            "repaymentFrequencyType": {
                "id": 2,
                "code": "repaymentFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "interestRatePerPeriod": 87.500000,
            "interestRateFrequencyType": {
                "id": 3,
                "code": "interestRateFrequency.periodFrequencyType.years",
                "value": "Per year"
            },
            "annualInterestRate": 87.500000,
            "isFloatingInterestRate": false,
            "interestRateDifferential": 0.0,
            "amortizationType": {
                "id": 1,
                "code": "amortizationType.equal.installments",
                "value": "Equal installments"
            },
            "interestType": {
                "id": 0,
                "code": "interestType.declining.balance",
                "value": "Declining Balance"
            },
            "interestCalculationPeriodType": {
                "id": 0,
                "code": "interestCalculationPeriodType.daily",
                "value": "Daily"
            },
            "allowPartialPeriodInterestCalcualtion": false,
            "inArrearsTolerance": 1.000000,
            "transactionProcessingStrategyId": 1,
            "transactionProcessingStrategyName": "Penalties, Fees, Interest, Principal order",
            "graceOnPrincipalPayment": 0,
            "recurringMoratoriumOnPrincipalPeriods": 0,
            "graceOnInterestPayment": 0,
            "graceOnInterestCharged": 0,
            "graceOnArrearsAgeing": 0,
            "expectedFirstRepaymentOnDate": [
                2019,
                10,
                7
            ],
            "syncDisbursementWithMeeting": false,
            "timeline": {
                "submittedOnDate": [
                    2019,
                    8,
                    28
                ],
                "submittedByUsername": "r.reyes@grupoconserva.mx",
                "submittedByFirstname": "ROBERTO",
                "submittedByLastname": "REYES DE LA VEGA",
                "rejectedOnDate": [
                    2019,
                    8,
                    29
                ],
                "rejectedByUsername": "r.reyes@grupoconserva.mx",
                "rejectedByFirstname": "ROBERTO",
                "rejectedByLastname": "REYES DE LA VEGA",
                "approvedOnDateTime": "",
                "expectedDisbursementDate": [
                    2019,
                    9,
                    2
                ],
                "expectedDisbursementDateTime": "9/2/19",
                "closedOnDate": [
                    2019,
                    8,
                    29
                ],
                "closedByUsername": "r.reyes@grupoconserva.mx",
                "closedByFirstname": "ROBERTO",
                "closedByLastname": "REYES DE LA VEGA",
                "expectedMaturityDate": [
                    2020,
                    1,
                    6
                ],
                "writeOffByUsername": "r.reyes@grupoconserva.mx",
                "writeOffByFirstname": "ROBERTO",
                "writeOffByLastname": "REYES DE LA VEGA"
            },
            "summary": {
                "currency": {
                    "code": "MXN",
                    "name": "Mexican Peso",
                    "decimalPlaces": 0,
                    "inMultiplesOf": 1,
                    "displaySymbol": "$",
                    "nameCode": "currency.MXN",
                    "displayLabel": "Mexican Peso ($)"
                },
                "principalDisbursed": 0.000000,
                "principalPaid": 0.000000,
                "principalWrittenOff": 0.000000,
                "principalOutstanding": 0.000000,
                "principalOverdue": 0.0,
                "interestCharged": 0.000000,
                "interestPaid": 0.000000,
                "interestWaived": 0.000000,
                "interestWrittenOff": 0.000000,
                "interestOutstanding": 0.000000,
                "interestOverdue": 0.0,
                "feeChargesCharged": 0.000000,
                "feeChargesDueAtDisbursementCharged": 0.000000,
                "feeChargesPaid": 0.000000,
                "feeChargesWaived": 0.000000,
                "feeChargesWrittenOff": 0.000000,
                "feeChargesOutstanding": 0.000000,
                "feeChargesOverdue": 0.0,
                "penaltyChargesCharged": 0.000000,
                "penaltyChargesPaid": 0.000000,
                "penaltyChargesWaived": 0.000000,
                "penaltyChargesWrittenOff": 0.000000,
                "penaltyChargesOutstanding": 0.000000,
                "penaltyChargesOverdue": 0.0,
                "totalExpectedRepayment": 960.000000,
                "totalRepayment": 0.000000,
                "totalExpectedCostOfLoan": 0.000000,
                "totalCostOfLoan": 0.000000,
                "totalWaived": 0.000000,
                "totalWrittenOff": 0.000000,
                "totalOutstanding": 960.000000,
                "totalOverdue": 0.0,
                "overdueSinceDate": null,
                "writeoffReasonId": 0,
                "writeoffReason": null
            },
            "fixedEmiAmount": 0.0,
            "maxOutstandingLoanBalance": 0.0,
            "topupAmount": 0.0,
            "interestRecalculationData": {
                "id": 45,
                "loanId": 47,
                "interestRecalculationCompoundingType": {
                    "id": 0,
                    "code": "interestRecalculationCompoundingMethod.none",
                    "value": "None"
                },
                "rescheduleStrategyType": {
                    "id": 3,
                    "code": "loanRescheduleStrategyMethod.reduce.emi.amount",
                    "value": "Reduce EMI amount"
                },
                "calendarData": null,
                "recalculationRestFrequencyType": {
                    "id": 2,
                    "code": "interestRecalculationFrequencyType.daily",
                    "value": "Daily"
                },
                "recalculationRestFrequencyInterval": 1,
                "recalculationRestFrequencyNthDay": null,
                "recalculationRestFrequencyWeekday": null,
                "recalculationRestFrequencyOnDay": 0,
                "recalculationCompoundingFrequencyType": {
                    "id": 0,
                    "code": "interestRecalculationFrequencyType.invalid",
                    "value": "Invalid"
                },
                "recalculationCompoundingFrequencyInterval": 0,
                "recalculationCompoundingFrequencyNthDay": null,
                "recalculationCompoundingFrequencyWeekday": null,
                "recalculationCompoundingFrequencyOnDay": 0,
                "isCompoundingToBePostedAsTransaction": false,
                "compoundingCalendarData": null,
                "allowCompoundingOnEod": false
            },
            "feeChargesAtDisbursementCharged": 0.000000,
            "totalOverpaid": 0.0,
            "loanCounter": 0,
            "loanProductCounter": 0,
            "multiDisburseLoan": false,
            "canDefineInstallmentAmount": false,
            "canDisburse": false,
            "canUseForTopup": false,
            "isTopup": false,
            "closureLoanId": 0,
            "inArrears": false,
            "isNPA": false,
            "daysInMonthType": {
                "id": 30,
                "code": "DaysInMonthType.days360",
                "value": "30 Days"
            },
            "daysInYearType": {
                "id": 360,
                "code": "DaysInYearType.days360",
                "value": "360 Days"
            },
            "isInterestRecalculationEnabled": true,
            "createStandingInstructionAtDisbursement": false,
            "isVariableInstallmentsAllowed": false,
            "minimumGap": 0,
            "maximumGap": 0,
            "isEqualAmortization": false
        },
        {
            "id": 2,
            "accountNo": "000000002",
            "status": {
                "id": 600,
                "code": "loanStatusType.closed.obligations.met",
                "value": "Closed (obligations met)",
                "pendingApproval": false,
                "waitingForDisbursal": false,
                "active": false,
                "closedObligationsMet": true,
                "closedWrittenOff": false,
                "closedRescheduled": false,
                "closed": true,
                "overpaid": false
            },
            "clientId": 5,
            "clientAccountNo": "000000005",
            "clientName": "Agustin Palacios  Aguado",
            "clientOfficeId": 44,
            "groupId": 0,
            "loanProductId": 1,
            "loanProductName": "TU NEGOCIO CON CONSERVA",
            "loanProductDescription": "SIMPLE",
            "isLoanProductLinkedToFloatingRate": false,
            "fundId": 1,
            "fundName": "RECURSOS PROPIOS",
            "bankId": 0,
            "bankAccountId": 0,
            "paymentTypeId": 0,
            "loanPurposeId": 21,
            "loanPurposeName": "ADQUIRIR O COMPRAR MERCANCIA",
            "loanOfficerId": 1,
            "loanOfficerName": "ZEMPOALTECATL SOLIS, BRANDON RENE",
            "loanType": {
                "id": 1,
                "code": "accountType.individual",
                "value": "Individual"
            },
            "currency": {
                "code": "MXN",
                "name": "Mexican Peso",
                "decimalPlaces": 2,
                "inMultiplesOf": 1,
                "displaySymbol": "$",
                "nameCode": "currency.MXN",
                "displayLabel": "Mexican Peso ($)"
            },
            "principal": 60000.000000,
            "approvedPrincipal": 60000.000000,
            "proposedPrincipal": 60000.000000,
            "termFrequency": 4,
            "termPeriodFrequencyType": {
                "id": 2,
                "code": "termFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "numberOfRepayments": 4,
            "repaymentEvery": 1,
            "repaymentFrequencyType": {
                "id": 2,
                "code": "repaymentFrequency.periodFrequencyType.months",
                "value": "Months"
            },
            "interestRatePerPeriod": 87.500000,
            "interestRateFrequencyType": {
                "id": 3,
                "code": "interestRateFrequency.periodFrequencyType.years",
                "value": "Per year"
            },
            "annualInterestRate": 87.500000,
            "isFloatingInterestRate": false,
            "interestRateDifferential": 0.0,
            "amortizationType": {
                "id": 1,
                "code": "amortizationType.equal.installments",
                "value": "Equal installments"
            },
            "interestType": {
                "id": 0,
                "code": "interestType.declining.balance",
                "value": "Declining Balance"
            },
            "interestCalculationPeriodType": {
                "id": 1,
                "code": "interestCalculationPeriodType.same.as.repayment.period",
                "value": "Same as repayment period"
            },
            "allowPartialPeriodInterestCalcualtion": false,
            "inArrearsTolerance": 1.000000,
            "transactionProcessingStrategyId": 1,
            "transactionProcessingStrategyName": "Penalties, Fees, Interest, Principal order",
            "graceOnPrincipalPayment": 0,
            "recurringMoratoriumOnPrincipalPeriods": 0,
            "graceOnInterestPayment": 0,
            "graceOnInterestCharged": 0,
            "graceOnArrearsAgeing": 0,
            "expectedFirstRepaymentOnDate": [
                2019,
                6,
                3
            ],
            "syncDisbursementWithMeeting": false,
            "timeline": {
                "submittedOnDate": [
                    2019,
                    5,
                    2
                ],
                "submittedByUsername": "brsolis@grupoconserva.mx",
                "submittedByFirstname": "Rene",
                "submittedByLastname": "Solis",
                "approvedOnDate": [
                    2019,
                    5,
                    3
                ],
                "approvedOnDateTime": "5/3/19",
                "approvedByUsername": "shbalderas@grupoconserva.mx",
                "approvedByFirstname": "Simon",
                "approvedByLastname": "Herrera Balderas ",
                "expectedDisbursementDate": [
                    2019,
                    5,
                    6
                ],
                "expectedDisbursementDateTime": "5/6/19",
                "actualDisbursementDate": [
                    2019,
                    5,
                    6
                ],
                "disbursedByUsername": "shbalderas@grupoconserva.mx",
                "disbursedByFirstname": "Simon",
                "disbursedByLastname": "Herrera Balderas ",
                "closedOnDate": [
                    2019,
                    9,
                    2
                ],
                "expectedMaturityDate": [
                    2019,
                    9,
                    2
                ]
            },
            "summary": {
                "currency": {
                    "code": "MXN",
                    "name": "Mexican Peso",
                    "decimalPlaces": 2,
                    "inMultiplesOf": 1,
                    "displaySymbol": "$",
                    "nameCode": "currency.MXN",
                    "displayLabel": "Mexican Peso ($)"
                },
                "principalDisbursed": 60000.000000,
                "principalPaid": 60000.000000,
                "principalWrittenOff": 0.000000,
                "principalOutstanding": 0.000000,
                "principalOverdue": 0.0,
                "interestCharged": 11380.720000,
                "interestPaid": 11380.720000,
                "interestWaived": 0.000000,
                "interestWrittenOff": 0.000000,
                "interestOutstanding": 0.000000,
                "interestOverdue": 0.0,
                "feeChargesCharged": 144.000000,
                "feeChargesDueAtDisbursementCharged": 0.000000,
                "feeChargesPaid": 144.000000,
                "feeChargesWaived": 0.000000,
                "feeChargesWrittenOff": 0.000000,
                "feeChargesOutstanding": 0.000000,
                "feeChargesOverdue": 0.0,
                "penaltyChargesCharged": 0.000000,
                "penaltyChargesPaid": 0.000000,
                "penaltyChargesWaived": 0.000000,
                "penaltyChargesWrittenOff": 0.000000,
                "penaltyChargesOutstanding": 0.000000,
                "penaltyChargesOverdue": 0.0,
                "totalExpectedRepayment": 73345.630000,
                "totalRepayment": 73345.630000,
                "totalExpectedCostOfLoan": 11524.720000,
                "totalCostOfLoan": 11524.720000,
                "totalWaived": 0.000000,
                "totalWrittenOff": 0.000000,
                "totalOutstanding": 0.000000,
                "totalOverdue": 0.0,
                "overdueSinceDate": null,
                "writeoffReasonId": 0,
                "writeoffReason": null
            },
            "fixedEmiAmount": 0.0,
            "maxOutstandingLoanBalance": 0.0,
            "topupAmount": 0.0,
            "feeChargesAtDisbursementCharged": 0.000000,
            "totalOverpaid": 0.0,
            "loanCounter": 1,
            "loanProductCounter": 1,
            "multiDisburseLoan": false,
            "canDefineInstallmentAmount": false,
            "canDisburse": false,
            "canUseForTopup": false,
            "isTopup": false,
            "closureLoanId": 0,
            "inArrears": false,
            "isNPA": false,
            "daysInMonthType": {
                "id": 30,
                "code": "DaysInMonthType.days360",
                "value": "30 Days"
            },
            "daysInYearType": {
                "id": 360,
                "code": "DaysInYearType.days360",
                "value": "360 Days"
            },
            "isInterestRecalculationEnabled": false,
            "createStandingInstructionAtDisbursement": false,
            "isVariableInstallmentsAllowed": false,
            "minimumGap": 0,
            "maximumGap": 0,
            "isEqualAmortization": false
        }
    ]



// expected output: "05"

// for (i = 0; i < 10; ++i) {
//     const rand = Math.trunc(Math.random() * (1000000));
//     const str1 = rand.toString();

//     console.log(str1.padStart(9, '0'));

// }


// const fullNumber = '2034399002125581';
// const last4Digits = fullNumber.slice(-4);
// const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

// console.log(maskedNumber);
// expected output: "************5581"

 
 
