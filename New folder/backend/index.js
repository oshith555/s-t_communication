import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
    credentials: true
  }
});

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'], credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api', limiter);
app.use('/api', apiRoutes);

const MONGO_URI = process.env.MONGO_URI || process.env.mongo_url || 'mongodb://127.0.0.1:27017/st-communication';
mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error', err);
  process.exit(1);
});

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export { io };
