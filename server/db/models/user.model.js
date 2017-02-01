const sequelize = require('../connection.js')
const Sequelize = require('Sequelize');

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

module.exports = User;