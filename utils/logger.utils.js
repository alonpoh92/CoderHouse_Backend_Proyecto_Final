const pino = require('pino');

const transport = pino.transport({
    targets: [
        {
            level: 'info',
            target: 'pino-pretty'
        },
        {
            level: 'warn',
            target: 'pino/file',
            options: {
                destination: './logs/warn.log',
                mkdir: true
            }
        },
        {
            level: 'error',
            target: 'pino/file',
            options: {
                destination: './logs/error.log',
                mkdir: true
            }
        }
    ]
  });

const logger = pino(transport);

module.exports = logger;