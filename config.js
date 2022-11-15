const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATASOURCE: process.env.DATASOURCE
}