import bcrypt from 'bcrypt';
import thinky from './util/thinky';

const type = thinky.type;

const User = thinky.createModel('User', {
  username: type.string().required(),
  email: type.string().email().required(),
  hash: type.string(),
  attempts: type.number().default(0),
  last_login: type.date().allowNull(true),
});

User.pre('save', function prepareSave(next) {
  this.email = this.email.toLowerCase();
  const password = this.password || '';
  delete this.password;
  // if (!this.hash && validatorMessages.isGoodPassword(password)) {
  if (!this.hash) {
    this.hash = bcrypt.hashSync(password, 10);
  }
  this.attempts = 0;
  this.last_login = (new Date()).getTime();
  return next();
});

User.define('public', function getProfile() {
  delete this.hash;
  return this;
});

User.define('authenticate', function authenticate(password) {
  if (bcrypt.compareSync(password, this.hash) && this.attempts < 20) {
    this.attempts = 0;
    this.save();
    delete this.hash;
    return this;
  }
  this.attempts += 1;
  this.save();
  return false;
});

module.exports = {
  User,
  thinky,
};

User.ensureIndex('email');

// const Account = require('./message.js');
//
// User.hasMany(Account, 'user', 'id', 'userId');
