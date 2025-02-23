import socketIOClient from 'socket.io-client';
const socket = socketIOClient(
    'http://localhost:5000',
    ); // Your API server URL

export default function emitEvent(eventType, data = {}) {
  socket.emit('WORKER_EVENT', {
    type: eventType,
    data
  });
}
