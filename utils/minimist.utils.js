const minimist = require('minimist');

module.exports = minimist(process.argv.slice(2), {
    alias: {
        p: 'port',
        m: 'mode'
    },
    default: {
        port: 8080,
        mode: 'FORK'
    }
});