const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_MODE: process.env.SERVER_MODE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_NAME: process.env.SESSION_NAME,
    SESSION_SECRET: process.env.SESSION_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,    
    EMAIL_GMAIL: process.env.EMAIL_GMAIL,
    PASS_GMAIL: process.env.PASS_GMAIL,    
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN, 
    TWILIO_PHONE: process.env.TWILIO_PHONE,
    TWILIO_SANDBOX: process.env.TWILIO_SANDBOX
}