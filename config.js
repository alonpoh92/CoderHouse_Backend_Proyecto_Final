const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_MODE: process.env.SERVER_MODE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_NAME: process.env.SESSION_NAME,
    SESSION_SECRET: process.env.SESSION_SECRET
}