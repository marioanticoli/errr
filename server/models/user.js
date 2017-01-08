const thinky = require('./util/thinky.js');

const type = thinky.type;

const User = thinky.createModel('User', {
  user: type.string().required(),
  email: type.string().email().required(),
  hash: type.string().required(),
  attempts: type.number().default(0),
  last_login: type.date().allowNull(true),
});

module.exports = User;

User.ensureIndex('email');

// const Account = require('./message.js');
//
// User.hasMany(Account, 'user', 'id', 'userId');
