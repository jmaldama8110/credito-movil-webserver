const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client  = require('twilio')(accountSid , authToken )


const sendWelcomeWhatsapp = ( to, body )=> {

    const from = process.env.TWILIO_PHONE_NUMBER_WHATSAPP // Numero comprado en Twilio
        
        client.messages
        .create({
        from:`whatsapp:${from}`,
        body,
        to:`whatsapp:${to}`
        })
    

}

module.exports = sendWelcomeWhatsapp
