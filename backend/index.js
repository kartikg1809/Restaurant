import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import itemRouter from './routes/itemRouter.js';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error(err));

app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);
app.use('/api/order', orderRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

const io = new Server(app.listen(process.env.PORT || 5000), {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export { app, io };
