const env = require('../../../env.config');

module.exports = {
    file: {
        dbname: 'fileStorage',
        products: 'products',
        messages: 'messages',
        users: 'users',
        carts: 'carts',
        orders: 'orders'
    },
    mongodb: {
        connectTo: (database) => `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.PROJECT_NAME}.mcdak1d.mongodb.net/${database}?retryWrites=true&w=majority`,
    },
    firebase: {
        credentials: {
            type: env.FB_TYPE,
            project_id: env.FB_POJECT_ID,
            private_key_id: env.FB_PRIVATE_KEY_ID,
            private_key: env.FB_PRIVATE_KEY,
            client_email: env.FB_CLIENT_EMAIL,
            client_id: env.FB_CLIENT_ID,
            auth_uri: env.FB_AUTH_URI,
            token_uri: env.FB_TOKEN_URI,
            auth_provider_x509_cert_url: env.FB_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: env.FB_CLIENT_X509_CERT_URL
        }
    }
}