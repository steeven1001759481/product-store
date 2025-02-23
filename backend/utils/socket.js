import { Server } from 'socket.io';

export default function initializeSocket(server) {
  try {
    // const origin = process.env.ORIGIN || "http://localhost:3000"; // MILAN:  commented temporary

    if (server) {
      const io = new Server(server, {
        cors: {
          origin: '*',
          path: '/socket.io',
        },
      });

      io.on('connection', () => {
        // console.log('socket connected!');
      });

      return io;
    }
  } catch (error) {}
}
