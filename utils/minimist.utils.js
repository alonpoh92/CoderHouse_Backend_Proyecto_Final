const minimist = require('minimist');
const env = require('../config');

module.exports = minimist(process.argv.slice(2), {
    alias: {
        p: 'port',
        m: 'mode'
    },
    default: {
        port: env.SERVER_PORT,
        mode: env.SERVER_MODE
    }
});