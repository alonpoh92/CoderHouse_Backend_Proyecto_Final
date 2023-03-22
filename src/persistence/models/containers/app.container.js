const env = require('../../../../env.config');

const containers = {
    DEVELOPMENT: {
        file: require('./file/file.container')
    },
    PRODUCTION: {
        firebase:require('./firebase/firebase.container'),
        mongo: require('./mongoDB/mongodb.container')
    }
}

module.exports = containers[env.NODE_ENV][env.PERSISTENCE];