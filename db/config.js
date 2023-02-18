const env = require('../config');

module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@coderhousebackend.mcdak1d.mongodb.net/${database}?retryWrites=true&w=majority`,
  }
  // Change here for your mongo atlas account's URI
}