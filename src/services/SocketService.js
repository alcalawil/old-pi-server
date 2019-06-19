const io = require('socket');

class SocketService {
  clients = {};

  constructor() {
    io.on('connection', (socket) => {
      this.clients[socket.id] = socket;
    });
  }

  sendMessage = (topic, message) => {
    for (const [key, client] of Object.entries(this.clients)) {
      client.emit(topic, [new Date().toISOString(), message]);
    }
  }
}

module.exports = new SocketService();
