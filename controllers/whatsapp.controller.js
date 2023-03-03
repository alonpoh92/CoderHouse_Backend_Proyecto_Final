const twilio = require('twilio');

const { HttpError } = require('../utils/api.utils');
const constants = require('../constants/api.constants');
const env = require('../config');

const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

class WhatsappController{
    async sendWhatsapp(whatsappOptions){
        try{
            await twilioClient.messages.create(whatsappOptions);
        }catch(error){
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }
};

module.exports = new WhatsappController();