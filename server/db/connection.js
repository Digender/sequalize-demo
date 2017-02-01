const Sequelize = require('Sequelize');
const dbName = 'digendar';
const username = 'digendar';
const password = 'SfbDtP2JKBtzQmGp'
const sequelize = new Sequelize(dbName, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = sequelize;