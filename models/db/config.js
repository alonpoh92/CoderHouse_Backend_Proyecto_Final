const env = require('../env.config');

module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://alonpoh92:${env.DB_PASSWORD}@coderhousebackend.mcdak1d.mongodb.net/${database}?retryWrites=true&w=majority`,
  }
  // Change here for your mongo atlas account's URI
}