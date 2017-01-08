import io from 'socket.io';
import Message from '../models/message';

const thinky = require('../models/util/thinky.js');

export default function (server) {
  thinky.dbReady().then(() => {
    const socketServer = io(server);
    const connections = {};
    let userIdCount = 0;

    Message.changes().then((feed) => {
      feed.each((error, doc) => {
        Object.keys(connections).forEach((userId) => {
          const message = doc;
          if (+userId !== message.userId) { // +userId => cast as int
            connections[userId].emit('message', message);
          }
        });
      });
    });

    socketServer.on('connection', (socket) => {
      const userId = (userIdCount += 1);
      connections[userId] = socket;

      socket.emit('start', { userId });

      socket.on('message', (data) => {
        new Message(data).save();
      });

      socket.on('disconnect', () => {
        delete connections[userId];
      });
    });
  });
}
