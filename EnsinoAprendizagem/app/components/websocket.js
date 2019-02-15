const socketIo = require('socket.io');
const config = require('../config/environment');

let  io;

function init(server) {
  if(config.env == 'test'){ //Do not create websocket when testing
    return;
  }
  io = socketIo(server);
}

function notify(user, message) {
  if(!io) { //Socket has not been created, probably because we're in an environment test
  return;
}
let recipient = user._id ? user._id : user;
let channel = `notifications.${recipient}`;
// Broadcast the notification
console.log('Broadcasting a message in channel %s: %s', channel, JSON.stringify(message));
io.emit(channel, message);

}

module.exports = {
  init   : init,
  notify : notify
};
