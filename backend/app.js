import dotenv from 'dotenv'
import express, { json } from 'express';
import http from 'http';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';
import initializeSocket from './utils/socket.js';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
};

// const io = initializeSocket(server);

app.use(express.json());
app.use('/api/products', productRoutes);
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// app.listen(PORT, ()=>{
//     connectDB();
//     console.log(`Listening on https://localhost:${PORT}`);
// })

server.listen(PORT, () => {
    connectDB();
    console.log(`Listening on https://localhost:${PORT}`);
});

const io = initializeSocket(server);
global.io = io;

io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for events from worker
  socket.on('WORKER_EVENT', ({ type, data }) => {
    // Emit to frontend clients
    io.emit(type, data);
  });
});


