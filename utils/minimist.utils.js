const minimist = require('minimist');
const env = require('../env.config');

module.exports = minimist(process.argv.slice(2), {
    alias: {
        p: 'port',
        m: 'mode'
    },
    default: {
        port: env.PORT,
        mode: env.SERVER_MODE
    }
});