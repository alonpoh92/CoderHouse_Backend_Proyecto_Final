const pino = require('pino');

const transport = pino.transport({
    targets: [
        {
            level: 'trace',
            target: 'pino-pretty'
        },
        {
            level: 'info',
            target: 'pino/file',
            options: {
                destination: './logs/info.log',
                mkdir: true
            }
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
logger.level = 'trace';

module.exports = logger;