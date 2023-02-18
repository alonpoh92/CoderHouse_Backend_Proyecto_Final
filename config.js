const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_NAME: process.env.SESSION_NAME,
    SESSION_SECRET: process.env.SESSION_SECRET
}