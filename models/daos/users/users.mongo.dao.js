const MongoDBContainer = require('../../containers/mongo.container');
const { HttpError } = require('../../../utils/api.utils');
const userSchema = require('../../schemas/User.schema');
const constants = require('../../../constants/api.constants');

const collection = 'users';

class UsersDao extends MongoDBContainer {
  constructor() {
    super(collection, userSchema);
  }
};

module.exports = UsersDao;