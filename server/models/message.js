const thinky = require('./util/thinky.js');

const type = thinky.type;

const Message = thinky.createModel('Message', {
  userId: type.number().default(0).required(),
  text: type.string().required(),
  time: type.date().required(),
});

module.exports = {
  Message,
  thinky,
};

Message.ensureIndex('time');

// const User = require('./user.js');
//
// Message.belongsTo(User, 'user', 'userId', 'id');
