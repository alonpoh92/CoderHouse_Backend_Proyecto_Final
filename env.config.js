require('dotenv').config();

let PERSISTENCE = "file";
if(process.env.NODE_ENV == "PRODUCTION"){
    PERSISTENCE = process.env.PERSISTENCE;
}

module.exports = {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    PORT: process.env.PORT,
    SERVER_MODE: process.env.SERVER_MODE,
    PERSISTENCE: PERSISTENCE,
    NODE_ENV: process.env.NODE_ENV,
    PROJECT_NAME: process.env.PROJECT_NAME,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    FB_TYPE: process.env.FB_TYPE.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_POJECT_ID: process.env.FB_POJECT_ID.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_PRIVATE_KEY_ID: process.env.FB_PRIVATE_KEY_ID.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_CLIENT_ID: process.env.FB_CLIENT_ID.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_AUTH_URI: process.env.FB_AUTH_URI.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_TOKEN_URI: process.env.FB_TOKEN_URI.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_AUTH_PROVIDER_X509_CERT_URL: process.env.FB_AUTH_PROVIDER_X509_CERT_URL.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_CLIENT_X509_CERT_URL: process.env.FB_CLIENT_X509_CERT_URL.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    SESSION_DATABASE: process.env.SESSION_DATABASE,
    COOKIE_NAME: process.env.COOKIE_NAME,
    SESSION_TIME_EXP: process.env.SESSION_TIME_EXP,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_PARAMETER_NAME: process.env.TOKEN_PARAMETER_NAME,
    EMAIL_GMAIL: process.env.EMAIL_GMAIL,
    PASS_GMAIL: process.env.PASS_GMAIL
}